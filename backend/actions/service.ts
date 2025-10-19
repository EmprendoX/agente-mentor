import { AnalyticsService } from '../analytics/service';
import {
  Alert,
  CreateAlertInput,
  CreateTaskInput,
  Task,
  TaskPriority,
  TaskStatus,
  UpdateTaskStatusInput,
} from './models';

export class ActionService {
  private readonly tasks: Task[] = [];

  private readonly alerts: Alert[] = [];

  constructor(private readonly analyticsService: AnalyticsService) {}

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

  private generateId(prefix: string): string {
    return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
  }
}

export const isValidTaskStatus = (status: string): status is TaskStatus =>
  ['pending', 'in_progress', 'completed'].includes(status);

export const isValidPriority = (priority: string): priority is TaskPriority =>
  ['low', 'medium', 'high'].includes(priority);
