export type TaskStatus = 'pending' | 'in_progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export type AlertType = 'info' | 'warning' | 'critical';

export interface Alert {
  id: string;
  type: AlertType;
  message: string;
  acknowledged: boolean;
  createdAt: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  priority?: TaskPriority;
  dueDate?: string;
}

export interface UpdateTaskStatusInput {
  id: string;
  status: TaskStatus;
}

export interface CreateAlertInput {
  type: AlertType;
  message: string;
}

export type ActionExecutionStatus = 'queued' | 'processing' | 'completed' | 'failed';

export interface ActionExecutionError {
  message: string;
  details?: unknown;
}

export interface ActionExecutionRecord {
  id: string;
  externalId?: string;
  userId: string;
  type: string;
  status: ActionExecutionStatus;
  payload: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  result?: unknown;
  error?: ActionExecutionError | null;
  createdAt: string;
  updatedAt: string;
  startedAt?: string;
  finishedAt?: string;
}

export interface CreateActionExecutionInput {
  id?: string;
  externalId?: string;
  userId: string;
  type: string;
  status: ActionExecutionStatus;
  payload: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface UpdateActionExecutionInput {
  status?: ActionExecutionStatus;
  result?: unknown;
  error?: ActionExecutionError | null;
  startedAt?: string;
  finishedAt?: string;
  metadata?: Record<string, unknown>;
}
