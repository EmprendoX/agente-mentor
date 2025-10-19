export interface ActionPayload<T = Record<string, unknown>> {
  type: string;
  data: T;
}

export interface ConnectorCredentials {
  [key: string]: string | undefined;
}

export interface ConnectorContext {
  userId: string;
  credentials: ConnectorCredentials;
  metadata?: Record<string, unknown>;
}

export interface ActionExecutionResult {
  success: boolean;
  message?: string;
  data?: unknown;
  connector: string;
}

export interface ActionConnector {
  readonly name: string;
  readonly supportedActions: readonly string[];

  supportsAction(actionType: string): boolean;

  execute(action: ActionPayload, context: ConnectorContext): Promise<ActionExecutionResult>;
}

export const createConnectorSupportPredicate = (supportedActions: readonly string[]) => {
  const supported = new Set(supportedActions);
  return (actionType: string): boolean => supported.has(actionType);
};
