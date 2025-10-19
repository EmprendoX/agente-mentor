import { ActionConnector, ActionExecutionResult, ActionPayload, ConnectorContext } from './connectors/base';

export type ActionExecutionStatus = 'queued' | 'processing' | 'completed' | 'failed';

export interface ActionUserContext {
  id: string;
  scopes: string[];
  credentials: Record<string, string>;
}

export interface ActionRequest {
  id?: string;
  type: string;
  payload: Record<string, unknown>;
  user: ActionUserContext;
  metadata?: Record<string, unknown>;
}

export interface AuthorizationValidator {
  ensureAuthorized(request: ActionRequest): Promise<void>;
}

export class UnauthorizedActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedActionError';
  }
}

export class ScopeAuthorizationValidator implements AuthorizationValidator {
  constructor(private readonly wildcardScope = '*') {}

  async ensureAuthorized(request: ActionRequest): Promise<void> {
    const scopes = new Set(request.user.scopes ?? []);
    if (scopes.has(this.wildcardScope)) {
      return;
    }

    if (!scopes.has(request.type)) {
      throw new UnauthorizedActionError(`User ${request.user.id} is not authorized for action ${request.type}.`);
    }
  }
}

export class ActionOrchestrator {
  private readonly connectorsByAction: Map<string, ActionConnector>;

  constructor(private readonly connectors: ActionConnector[], private readonly authorizationValidator: AuthorizationValidator) {
    this.connectorsByAction = this.buildConnectorsIndex(connectors);
  }

  async execute(request: ActionRequest): Promise<ActionExecutionResult> {
    await this.authorizationValidator.ensureAuthorized(request);
    const connector = this.resolveConnector(request.type);
    const context: ConnectorContext = {
      userId: request.user.id,
      credentials: request.user.credentials,
      metadata: request.metadata,
    };

    const action: ActionPayload = { type: request.type, data: request.payload };
    return connector.execute(action, context);
  }

  private buildConnectorsIndex(connectors: ActionConnector[]): Map<string, ActionConnector> {
    const index = new Map<string, ActionConnector>();
    connectors.forEach((connector) => {
      connector.supportedActions.forEach((actionType) => {
        index.set(actionType, connector);
      });
    });
    return index;
  }

  private resolveConnector(actionType: string): ActionConnector {
    const connector = this.connectorsByAction.get(actionType);
    if (!connector) {
      throw new Error(`No connector registered for action ${actionType}.`);
    }
    return connector;
  }
}
