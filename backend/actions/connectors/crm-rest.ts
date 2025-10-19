import { ActionConnector, ActionExecutionResult, ActionPayload, ConnectorContext, createConnectorSupportPredicate } from './base';

interface CrmRestPayload {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH';
  body?: Record<string, unknown>;
  query?: Record<string, string>;
}

const SUPPORTED_ACTIONS = ['crm.sync_record'] as const;

type SupportedAction = (typeof SUPPORTED_ACTIONS)[number];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const requireString = (value: unknown, field: string): string => {
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`Campo "${field}" inválido o ausente.`);
  }
  return value;
};

const buildUrl = (base: string, endpoint: string, query?: Record<string, string>): string => {
  const trimmedBase = base.replace(/\/$/u, '');
  const trimmedEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  const url = new URL(`${trimmedBase}/${trimmedEndpoint}`);
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  return url.toString();
};

export class CrmRestConnector implements ActionConnector {
  readonly name = 'crm-rest';

  readonly supportedActions = SUPPORTED_ACTIONS;

  private readonly supports = createConnectorSupportPredicate(this.supportedActions);

  supportsAction(actionType: string): boolean {
    return this.supports(actionType);
  }

  async execute(action: ActionPayload, context: ConnectorContext): Promise<ActionExecutionResult> {
    switch (action.type as SupportedAction) {
      case 'crm.sync_record':
        return this.performRequest(this.parsePayload(action.data), context);
      default:
        throw new Error(`Unsupported action type: ${action.type}`);
    }
  }

  private parsePayload(raw: unknown): CrmRestPayload {
    if (!isRecord(raw)) {
      throw new Error('Invalid CRM payload.');
    }

    const query = isRecord(raw.query)
      ? Object.entries(raw.query).reduce<Record<string, string>>((acc, [key, value]) => {
          if (typeof value === 'string') {
            acc[key] = value;
          }
          return acc;
        }, {})
      : undefined;

    return {
      endpoint: requireString(raw.endpoint, 'endpoint'),
      method: typeof raw.method === 'string' ? (raw.method.toUpperCase() as CrmRestPayload['method']) : undefined,
      body: isRecord(raw.body) ? raw.body : undefined,
      query,
    };
  }

  private async performRequest(payload: CrmRestPayload, context: ConnectorContext): Promise<ActionExecutionResult> {
    const baseUrl = context.credentials.crmBaseUrl || process.env.CRM_BASE_URL;
    const apiKey = context.credentials.crmApiKey || process.env.CRM_API_KEY;

    if (!baseUrl || !apiKey) {
      throw new Error('CRM REST credentials are not fully configured.');
    }

    const method = payload.method ?? 'POST';
    const url = buildUrl(baseUrl, payload.endpoint, payload.query);
    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: method === 'GET' ? undefined : JSON.stringify(payload.body ?? {}),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`CRM REST request failed. Status: ${response.status}. Body: ${errorBody}`);
    }

    const data = await response.json();
    return {
      success: true,
      message: 'CRM actualizado correctamente.',
      data,
      connector: this.name,
    };
  }
}
