import crypto from 'crypto';
import { ActionConnector, ActionExecutionResult, ActionPayload, ConnectorContext, createConnectorSupportPredicate } from './base';

interface GmailMessagePayload {
  to: string;
  subject: string;
  body: string;
  threadId?: string;
}

interface CalendarEventPayload {
  summary: string;
  description?: string;
  start: { dateTime: string; timeZone?: string };
  end: { dateTime: string; timeZone?: string };
  attendees?: Array<{ email: string }>;
  location?: string;
}

const GMAIL_SEND_ENDPOINT = 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send';
const CALENDAR_EVENTS_ENDPOINT = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';

const SUPPORTED_ACTIONS = ['gmail.send_email', 'calendar.create_event'] as const;

type SupportedAction = (typeof SUPPORTED_ACTIONS)[number];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const requireString = (value: unknown, field: string): string => {
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`Campo "${field}" inválido o ausente.`);
  }
  return value;
};

const requireDateTime = (value: unknown, field: string): { dateTime: string; timeZone?: string } => {
  if (!isRecord(value) || typeof value.dateTime !== 'string') {
    throw new Error(`Campo "${field}" inválido.`);
  }
  return {
    dateTime: value.dateTime,
    timeZone: typeof value.timeZone === 'string' ? value.timeZone : undefined,
  };
};

const encodeBase64Url = (raw: string): string =>
  Buffer.from(raw).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/u, '');

const buildGmailRawMessage = ({ to, subject, body }: GmailMessagePayload): string => {
  const headers = [`To: ${to}`, `Subject: ${subject}`, 'Content-Type: text/html; charset=utf-8'];
  return encodeBase64Url(`${headers.join('\r\n')}\r\n\r\n${body}`);
};

const hashPayload = (payload: unknown): string =>
  crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex');

export class GmailCalendarConnector implements ActionConnector {
  readonly name = 'gmail-calendar';

  readonly supportedActions = SUPPORTED_ACTIONS;

  private readonly supports = createConnectorSupportPredicate(this.supportedActions);

  supportsAction(actionType: string): boolean {
    return this.supports(actionType);
  }

  async execute(action: ActionPayload, context: ConnectorContext): Promise<ActionExecutionResult> {
    if (!context.credentials.googleAccessToken) {
      throw new Error('Google access token not provided for user.');
    }

    switch (action.type as SupportedAction) {
      case 'gmail.send_email':
        return this.sendEmail(this.parseGmailPayload(action.data), context);
      case 'calendar.create_event':
        return this.createEvent(this.parseCalendarPayload(action.data), context);
      default:
        throw new Error(`Unsupported action type: ${action.type}`);
    }
  }

  private parseGmailPayload(raw: unknown): GmailMessagePayload {
    if (!isRecord(raw)) {
      throw new Error('Invalid Gmail payload.');
    }

    return {
      to: requireString(raw.to, 'to'),
      subject: requireString(raw.subject, 'subject'),
      body: requireString(raw.body, 'body'),
      threadId: typeof raw.threadId === 'string' ? raw.threadId : undefined,
    };
  }

  private parseCalendarPayload(raw: unknown): CalendarEventPayload {
    if (!isRecord(raw)) {
      throw new Error('Invalid calendar payload.');
    }

    const attendeesRaw = Array.isArray(raw.attendees)
      ? raw.attendees
          .filter((attendee): attendee is Record<string, unknown> => isRecord(attendee))
          .map((attendee) => ({ email: requireString(attendee.email, 'attendees[].email') }))
      : undefined;

    return {
      summary: requireString(raw.summary, 'summary'),
      description: typeof raw.description === 'string' ? raw.description : undefined,
      start: requireDateTime(raw.start, 'start'),
      end: requireDateTime(raw.end, 'end'),
      attendees: attendeesRaw,
      location: typeof raw.location === 'string' ? raw.location : undefined,
    };
  }

  private async sendEmail(payload: GmailMessagePayload, context: ConnectorContext): Promise<ActionExecutionResult> {
    const response = await fetch(GMAIL_SEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${context.credentials.googleAccessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw: buildGmailRawMessage(payload), threadId: payload.threadId }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Failed to send email via Gmail API. Status: ${response.status}. Body: ${errorBody}`);
    }

    const data = await response.json();
    return {
      success: true,
      message: 'Correo enviado correctamente.',
      data: { id: data.id, threadId: data.threadId, checksum: hashPayload(payload) },
      connector: this.name,
    };
  }

  private async createEvent(payload: CalendarEventPayload, context: ConnectorContext): Promise<ActionExecutionResult> {
    const response = await fetch(CALENDAR_EVENTS_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${context.credentials.googleAccessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Failed to create calendar event. Status: ${response.status}. Body: ${errorBody}`);
    }

    const data = await response.json();
    return {
      success: true,
      message: 'Evento de calendario creado.',
      data: { id: data.id, htmlLink: data.htmlLink, checksum: hashPayload(payload) },
      connector: this.name,
    };
  }
}
