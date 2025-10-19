import { ActionConnector, ActionExecutionResult, ActionPayload, ConnectorContext, createConnectorSupportPredicate } from './base';

interface SlackMessagePayload {
  channel: string;
  text: string;
  threadTs?: string;
  blocks?: unknown[];
}

interface WhatsAppMessagePayload {
  phoneNumber: string;
  message: string;
  template?: {
    name: string;
    language: string;
    components?: unknown[];
  };
}

const SUPPORTED_ACTIONS = ['slack.post_message', 'whatsapp.send_message'] as const;

type SupportedAction = (typeof SUPPORTED_ACTIONS)[number];

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

const requireString = (value: unknown, field: string): string => {
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`Campo "${field}" inválido o ausente.`);
  }
  return value;
};

export class SlackWhatsAppConnector implements ActionConnector {
  readonly name = 'slack-whatsapp';

  readonly supportedActions = SUPPORTED_ACTIONS;

  private readonly supports = createConnectorSupportPredicate(this.supportedActions);

  supportsAction(actionType: string): boolean {
    return this.supports(actionType);
  }

  async execute(action: ActionPayload, context: ConnectorContext): Promise<ActionExecutionResult> {
    switch (action.type as SupportedAction) {
      case 'slack.post_message':
        return this.postSlackMessage(this.parseSlackPayload(action.data), context);
      case 'whatsapp.send_message':
        return this.sendWhatsAppMessage(this.parseWhatsAppPayload(action.data), context);
      default:
        throw new Error(`Unsupported action type: ${action.type}`);
    }
  }

  private parseSlackPayload(raw: unknown): SlackMessagePayload {
    if (!isRecord(raw)) {
      throw new Error('Invalid Slack payload.');
    }

    return {
      channel: requireString(raw.channel, 'channel'),
      text: requireString(raw.text, 'text'),
      threadTs: typeof raw.threadTs === 'string' ? raw.threadTs : undefined,
      blocks: Array.isArray(raw.blocks) ? raw.blocks : undefined,
    };
  }

  private parseWhatsAppPayload(raw: unknown): WhatsAppMessagePayload {
    if (!isRecord(raw)) {
      throw new Error('Invalid WhatsApp payload.');
    }

    return {
      phoneNumber: requireString(raw.phoneNumber, 'phoneNumber'),
      message: requireString(raw.message, 'message'),
      template: isRecord(raw.template)
        ? {
            name: requireString(raw.template.name, 'template.name'),
            language: requireString(raw.template.language, 'template.language'),
            components: Array.isArray(raw.template.components) ? raw.template.components : undefined,
          }
        : undefined,
    };
  }

  private async postSlackMessage(payload: SlackMessagePayload, context: ConnectorContext): Promise<ActionExecutionResult> {
    const token = context.credentials.slackBotToken || process.env.SLACK_BOT_TOKEN;
    if (!token) {
      throw new Error('Slack bot token not available.');
    }

    const response = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!data.ok) {
      throw new Error(`Failed to post Slack message: ${data.error ?? 'unknown_error'}`);
    }

    return {
      success: true,
      message: 'Mensaje publicado en Slack.',
      data,
      connector: this.name,
    };
  }

  private async sendWhatsAppMessage(payload: WhatsAppMessagePayload, context: ConnectorContext): Promise<ActionExecutionResult> {
    const token = context.credentials.twilioToken || process.env.TWILIO_WHATSAPP_TOKEN;
    const fromNumber = context.credentials.twilioFrom || process.env.TWILIO_WHATSAPP_FROM;
    const accountSid = context.credentials.twilioAccountSid || process.env.TWILIO_ACCOUNT_SID;

    if (!token || !fromNumber || !accountSid) {
      throw new Error('Incomplete WhatsApp credentials.');
    }

    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    const body = new URLSearchParams({
      From: fromNumber,
      To: payload.phoneNumber,
      Body: payload.message,
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${accountSid}:${token}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to send WhatsApp message via Twilio. Status: ${response.status}. Body: ${errorText}`);
    }

    const data = await response.json();
    return {
      success: true,
      message: 'Mensaje enviado por WhatsApp.',
      data,
      connector: this.name,
    };
  }
}
