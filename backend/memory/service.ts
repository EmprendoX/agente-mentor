import { AnalyticsService } from '../analytics/service';
import { ContextUpdate, CreateContextUpdateInput } from './models';

export class MemoryService {
  private readonly updates: ContextUpdate[] = [];

  constructor(private readonly analyticsService: AnalyticsService) {}

  listUpdates(): ContextUpdate[] {
    return [...this.updates].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }

  addUpdate(input: CreateContextUpdateInput): ContextUpdate {
    const update: ContextUpdate = {
      id: this.generateId(),
      summary: input.summary,
      author: input.author,
      tags: input.tags ?? [],
      createdAt: new Date().toISOString(),
    };

    this.updates.push(update);
    this.analyticsService.recordEvent('context.update', { updateId: update.id, tags: update.tags });
    return update;
  }

  private generateId(): string {
    return `ctx_${Math.random().toString(36).slice(2, 10)}`;
  }
}
