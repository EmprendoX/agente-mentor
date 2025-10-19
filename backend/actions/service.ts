import { AnalyticsService } from '../analytics/service';
import { SupabaseActionsRepository } from './supabase-repository';
import {
  ActionExecutionRecord,
  ActionExecutionStatus,
  Alert,
  CreateActionExecutionInput,
  CreateAlertInput,
  CreateTaskInput,
  Task,
  TaskPriority,
  TaskStatus,
  UpdateActionExecutionInput,
  UpdateTaskStatusInput,
} from './models';

export class ActionService {
  private readonly tasks: Task[] = [];

  private readonly alerts: Alert[] = [];

  private readonly actionExecutions: ActionExecutionRecord[] = [];

  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly supabaseRepository: SupabaseActionsRepository | undefined = undefined,
  ) {}

  listTasks(): Task[] {
    return [...this.tasks].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }

  createTask(input: CreateTaskInput): Task {
    const now = new Date().toISOString();
    const task: Task = {
      id: this.generateId('tsk'),
      title: input.title,
      description: input.description,
      status: 'pending',
      priority: input.priority ?? 'medium',
      dueDate: input.dueDate,
      createdAt: now,
      updatedAt: now,
    };

    this.tasks.push(task);
    this.analyticsService.recordEvent('task.created', { taskId: task.id, priority: task.priority });
    return task;
  }

  updateTaskStatus({ id, status }: UpdateTaskStatusInput): Task | undefined {
    const task = this.tasks.find((item) => item.id === id);
    if (!task) {
      return undefined;
    }

    task.status = status;
    task.updatedAt = new Date().toISOString();
    this.analyticsService.recordEvent('task.status.updated', { taskId: task.id, status });
    return task;
  }

  completeTask(id: string): Task | undefined {
    return this.updateTaskStatus({ id, status: 'completed' });
  }

  listAlerts(): Alert[] {
    return [...this.alerts].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }

  createAlert(input: CreateAlertInput): Alert {
    const alert: Alert = {
      id: this.generateId('alt'),
      type: input.type,
      message: input.message,
      acknowledged: false,
      createdAt: new Date().toISOString(),
    };

    this.alerts.push(alert);
    this.analyticsService.recordEvent('alert.created', { alertId: alert.id, type: alert.type });
    return alert;
  }

  acknowledgeAlert(id: string): Alert | undefined {
    const alert = this.alerts.find((item) => item.id === id);
    if (!alert) {
      return undefined;
    }

    alert.acknowledged = true;
    this.analyticsService.recordEvent('alert.acknowledged', { alertId: alert.id });
    return alert;
  }

  listActionExecutions(): ActionExecutionRecord[] {
    return [...this.actionExecutions].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }

  getActionExecutionById(id: string): ActionExecutionRecord | undefined {
    return this.actionExecutions.find((item) => item.id === id);
  }

  createActionExecution(input: CreateActionExecutionInput): ActionExecutionRecord {
    const now = new Date().toISOString();
    const record: ActionExecutionRecord = {
      id: input.id ?? this.generateId('act'),
      externalId: input.externalId,
      userId: input.userId,
      type: input.type,
      status: input.status,
      payload: input.payload,
      metadata: input.metadata,
      createdAt: now,
      updatedAt: now,
    };

    this.actionExecutions.push(record);
    this.analyticsService.recordEvent('action.execution.created', {
      actionId: record.id,
      type: record.type,
      status: record.status,
    });
    void this.persistExecution(record);
    return record;
  }

  updateActionExecution(id: string, update: UpdateActionExecutionInput): ActionExecutionRecord | undefined {
    const record = this.actionExecutions.find((item) => item.id === id);
    if (!record) {
      return undefined;
    }

    const statusBefore = record.status;
    if (update.status) {
      record.status = update.status;
    }
    if (update.result !== undefined) {
      record.result = update.result;
    }
    if (update.error !== undefined) {
      record.error = update.error;
    }
    if (update.startedAt) {
      record.startedAt = update.startedAt;
    }
    if (update.finishedAt) {
      record.finishedAt = update.finishedAt;
    }
    if (update.metadata) {
      record.metadata = { ...(record.metadata ?? {}), ...update.metadata };
    }

    record.updatedAt = new Date().toISOString();
    void this.persistExecution(record);

    if (update.status && update.status !== statusBefore) {
      this.analyticsService.recordEvent('action.execution.status', {
        actionId: record.id,
        from: statusBefore,
        to: update.status,
      });

      if (update.status === 'completed') {
        this.analyticsService.recordDecisionAccepted('action.execution', {
          actionId: record.id,
          type: record.type,
        });
      }

      if (update.status === 'failed') {
        this.analyticsService.recordDecisionRejected('action.execution', {
          actionId: record.id,
          type: record.type,
        });
      }
    }

    if (update.error) {
      this.analyticsService.recordEvent('action.execution.failed', {
        actionId: record.id,
        error: update.error.message,
      });

      if (update.status !== 'failed') {
        this.analyticsService.recordDecisionRejected('action.execution', {
          actionId: record.id,
          type: record.type,
          reason: update.error.message,
        });
      }
    }

    return record;
  }

  private async persistExecution(record: ActionExecutionRecord): Promise<void> {
    try {
      await this.supabaseRepository?.upsertExecution(record);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'unknown error';
      // eslint-disable-next-line no-console
      console.error('Failed to persist action execution:', message);
    }
  }

  private generateId(prefix: string): string {
    return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
  }
}

export const isValidTaskStatus = (status: string): status is TaskStatus =>
  ['pending', 'in_progress', 'completed'].includes(status);

export const isValidPriority = (priority: string): priority is TaskPriority =>
  ['low', 'medium', 'high'].includes(priority);

export const isValidExecutionStatus = (status: string): status is ActionExecutionStatus =>
  ['queued', 'processing', 'completed', 'failed'].includes(status);
