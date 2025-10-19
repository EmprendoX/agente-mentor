import { AnalyticsEvent } from './models';

export class AnalyticsService {
  private readonly events: AnalyticsEvent[] = [];

  recordEvent(type: string, payload?: Record<string, unknown>): AnalyticsEvent {
    const event: AnalyticsEvent = {
      id: this.generateId(),
      type,
      timestamp: new Date().toISOString(),
      payload,
    };

    this.events.push(event);
    return event;
  }

  listEvents(): AnalyticsEvent[] {
    return [...this.events].sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
  }

  private generateId(): string {
    return `evt_${Math.random().toString(36).slice(2, 10)}`;
  }
}
