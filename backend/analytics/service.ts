import {
  AnalyticsEvent,
  BriefingAnalyticsSnapshot,
  BriefingHighlight,
  CategoryBreakdownItem,
  ReportAnalyticsSnapshot,
  TimeSeriesPoint,
} from './models';

type AggregationBucket = {
  date: Date;
  interactions: number;
  decisionsAccepted: number;
  decisionsRejected: number;
  alertsCreated: number;
  alertsAcknowledged: number;
};

const TWENTY_FOUR_HOURS_IN_MS = 24 * 60 * 60 * 1000;

const HIGHLIGHT_STYLE: Record<BriefingHighlight['impact'], string> = {
  positive: 'Interacciones al alza',
  negative: 'Atención requerida',
  neutral: 'Actualización',
};

export class AnalyticsService {
  private readonly events: AnalyticsEvent[] = [];

  private briefingSnapshot: BriefingAnalyticsSnapshot = this.createEmptyBriefingSnapshot();

  private reportSnapshot: ReportAnalyticsSnapshot = this.createEmptyReportSnapshot();

  private readonly aggregationWindowDays: number;

  private readonly refreshIntervalMs: number;

  private readonly timer: NodeJS.Timeout;

  constructor(aggregationWindowDays = 7, refreshIntervalMs = 60_000) {
    this.aggregationWindowDays = aggregationWindowDays;
    this.refreshIntervalMs = refreshIntervalMs;

    this.computeAggregations();
    this.timer = setInterval(() => this.computeAggregations(), this.refreshIntervalMs);
    if (typeof this.timer.unref === 'function') {
      this.timer.unref();
    }
  }

  recordInteraction(source: string, payload?: Record<string, unknown>): AnalyticsEvent {
    return this.recordEvent('interaction.logged', { source, ...(payload ?? {}) });
  }

  recordDecisionAccepted(source: string, payload?: Record<string, unknown>): AnalyticsEvent {
    return this.recordEvent('decision.accepted', { source, ...(payload ?? {}) });
  }

  recordDecisionRejected(source: string, payload?: Record<string, unknown>): AnalyticsEvent {
    return this.recordEvent('decision.rejected', { source, ...(payload ?? {}) });
  }

  recordEvent(type: string, payload?: Record<string, unknown>): AnalyticsEvent {
    const event: AnalyticsEvent = {
      id: this.generateId(),
      type,
      timestamp: new Date().toISOString(),
      payload,
    };

    this.events.push(event);
    this.computeAggregations();
    return event;
  }

  listEvents(): AnalyticsEvent[] {
    return [...this.events].sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
  }

  getBriefingSnapshot(): BriefingAnalyticsSnapshot {
    return this.cloneBriefingSnapshot();
  }

  getReportSnapshot(): ReportAnalyticsSnapshot {
    return this.cloneReportSnapshot();
  }

  private computeAggregations(): void {
    const now = new Date();
    const startDate = this.subtractDays(now, this.aggregationWindowDays - 1);
    const buckets = this.createBuckets(startDate, this.aggregationWindowDays);
    const bucketMap = new Map<string, AggregationBucket>();
    buckets.forEach((bucket) => bucketMap.set(this.toDateKey(bucket.date), bucket));

    const twentyFourHoursAgo = new Date(now.getTime() - TWENTY_FOUR_HOURS_IN_MS);

    let interactions24h = 0;
    let decisionsAccepted24h = 0;
    let alertsCreatedWeek = 0;
    let alertsAcknowledgedWeek = 0;
    let decisionsAcceptedWeek = 0;
    let decisionsRejectedWeek = 0;

    const interactionSources = new Map<string, number>();
    const alertStatus = new Map<string, 'active' | 'acknowledged'>();

    const chronologicalEvents = [...this.events].sort((a, b) =>
      a.timestamp.localeCompare(b.timestamp),
    );

    for (const event of chronologicalEvents) {
      const eventDate = new Date(event.timestamp);
      if (Number.isNaN(eventDate.getTime())) {
        continue;
      }

      const bucketKey = this.toDateKey(eventDate);
      const bucket = bucketMap.get(bucketKey);
      const payload = event.payload ?? {};

      if (event.type === 'alert.created') {
        const alertId = this.extractIdentifier(payload, 'alertId');
        if (alertId) {
          alertStatus.set(alertId, 'active');
        }
      }

      if (event.type === 'alert.acknowledged') {
        const alertId = this.extractIdentifier(payload, 'alertId');
        if (alertId) {
          alertStatus.set(alertId, 'acknowledged');
        }
      }

      if (eventDate >= twentyFourHoursAgo) {
        if (event.type === 'interaction.logged') {
          interactions24h += 1;
        }
        if (event.type === 'decision.accepted') {
          decisionsAccepted24h += 1;
        }
      }

      if (!bucket || eventDate < startDate) {
        continue;
      }

      switch (event.type) {
        case 'interaction.logged':
          bucket.interactions += 1;
          {
            const sourceLabel = this.extractSource(payload) ?? 'otros';
            interactionSources.set(sourceLabel, (interactionSources.get(sourceLabel) ?? 0) + 1);
          }
          break;
        case 'decision.accepted':
          bucket.decisionsAccepted += 1;
          decisionsAcceptedWeek += 1;
          break;
        case 'decision.rejected':
          bucket.decisionsRejected += 1;
          decisionsRejectedWeek += 1;
          break;
        case 'alert.created':
          bucket.alertsCreated += 1;
          alertsCreatedWeek += 1;
          break;
        case 'alert.acknowledged':
          bucket.alertsAcknowledged += 1;
          alertsAcknowledgedWeek += 1;
          break;
        default:
          break;
      }
    }

    const activeAlerts = [...alertStatus.values()].filter((status) => status === 'active').length;

    const interactionsSeries = buckets.map((bucket) =>
      this.toPoint(bucket.date, bucket.interactions),
    );
    const decisionsSeries = buckets.map((bucket) =>
      this.toPoint(bucket.date, bucket.decisionsAccepted),
    );
    const alertsAcknowledgedSeries = buckets.map((bucket) =>
      this.toPoint(bucket.date, bucket.alertsAcknowledged),
    );
    const alertsCreatedSeries = buckets.map((bucket) => this.toPoint(bucket.date, bucket.alertsCreated));

    const highlights = this.buildHighlights({
      interactionsSeries,
      decisionsAccepted24h,
      activeAlerts,
    });

    const acceptanceRateBase = decisionsAcceptedWeek + decisionsRejectedWeek;
    const acceptanceRate = acceptanceRateBase === 0 ? 0 : (decisionsAcceptedWeek / acceptanceRateBase) * 100;

    const interactionSourcesList = this.mapToSortedList(interactionSources, 5);

    const relevantTypes = new Set<AnalyticsEvent['type']>([
      'interaction.logged',
      'decision.accepted',
      'decision.rejected',
      'alert.created',
      'alert.acknowledged',
    ]);

    const recentActivity = [...this.events]
      .filter((event) => relevantTypes.has(event.type))
      .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
      .slice(0, 10);

    this.briefingSnapshot = {
      generatedAt: now.toISOString(),
      totals: {
        interactions24h,
        decisionsAccepted24h,
        activeAlerts,
      },
      trend: {
        interactions: interactionsSeries,
        decisions: decisionsSeries,
        alertsAcknowledged: alertsAcknowledgedSeries,
      },
      highlights,
      recentActivity,
    };

    const alertsAcknowledgedThisWeek = buckets.reduce((acc, bucket) => acc + bucket.alertsAcknowledged, 0);

    this.reportSnapshot = {
      generatedAt: now.toISOString(),
      overview: {
        interactionsThisWeek: interactionsSeries.reduce((acc, point) => acc + point.value, 0),
        alertsCreatedThisWeek: buckets.reduce((acc, bucket) => acc + bucket.alertsCreated, 0),
        alertsAcknowledgedThisWeek,
        decisionsAcceptanceRate: Number(acceptanceRate.toFixed(1)),
      },
      timeseries: {
        interactions: interactionsSeries,
        decisions: buckets.map((bucket) =>
          this.toPoint(bucket.date, bucket.decisionsAccepted + bucket.decisionsRejected),
        ),
        alerts: alertsCreatedSeries,
        alertsAcknowledged: alertsAcknowledgedSeries,
      },
      decisionOutcomes: [
        { label: 'Aceptadas', value: decisionsAcceptedWeek },
        { label: 'Rechazadas', value: decisionsRejectedWeek },
      ],
      interactionSources: interactionSourcesList,
    };
  }

  private createBuckets(startDate: Date, totalDays: number): AggregationBucket[] {
    return Array.from({ length: totalDays }, (_, index) => {
      const date = new Date(Date.UTC(
        startDate.getUTCFullYear(),
        startDate.getUTCMonth(),
        startDate.getUTCDate() + index,
      ));
      return {
        date,
        interactions: 0,
        decisionsAccepted: 0,
        decisionsRejected: 0,
        alertsCreated: 0,
        alertsAcknowledged: 0,
      };
    });
  }

  private subtractDays(date: Date, days: number): Date {
    const copy = new Date(date.getTime());
    copy.setUTCDate(copy.getUTCDate() - days);
    copy.setUTCHours(0, 0, 0, 0);
    return copy;
  }

  private toDateKey(date: Date): string {
    return date.toISOString().slice(0, 10);
  }

  private toPoint(date: Date, value: number): TimeSeriesPoint {
    return {
      date: this.toDateKey(date),
      value,
    };
  }

  private mapToSortedList(map: Map<string, number>, limit: number): CategoryBreakdownItem[] {
    return [...map.entries()]
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, limit);
  }

  private extractSource(payload: Record<string, unknown>): string | undefined {
    const source = payload.source;
    return typeof source === 'string' && source.length > 0 ? source : undefined;
  }

  private extractIdentifier(payload: Record<string, unknown>, key: string): string | undefined {
    const value = payload[key];
    return typeof value === 'string' ? value : undefined;
  }

  private buildHighlights({
    interactionsSeries,
    decisionsAccepted24h,
    activeAlerts,
  }: {
    interactionsSeries: TimeSeriesPoint[];
    decisionsAccepted24h: number;
    activeAlerts: number;
  }): BriefingHighlight[] {
    const highlights: BriefingHighlight[] = [];
    const today = interactionsSeries[interactionsSeries.length - 1]?.value ?? 0;
    const yesterday = interactionsSeries[interactionsSeries.length - 2]?.value ?? today;
    const delta = today - yesterday;

    if (delta !== 0) {
      highlights.push({
        label: HIGHLIGHT_STYLE[delta > 0 ? 'positive' : 'negative'],
        description:
          delta > 0
            ? `Interacciones aumentaron en ${delta} respecto a ayer.`
            : `Interacciones disminuyeron en ${Math.abs(delta)} respecto a ayer.`,
        impact: delta > 0 ? 'positive' : 'negative',
      });
    } else {
      highlights.push({
        label: HIGHLIGHT_STYLE.neutral,
        description: 'Interacciones estables frente al día anterior.',
        impact: 'neutral',
      });
    }

    if (decisionsAccepted24h > 0) {
      highlights.push({
        label: 'Decisiones aceptadas',
        description: `${decisionsAccepted24h} decisiones aprobadas en las últimas 24h.`,
        impact: 'positive',
      });
    }

    if (activeAlerts > 0) {
      highlights.push({
        label: 'Alertas pendientes',
        description: `${activeAlerts} alertas siguen activas y requieren seguimiento.`,
        impact: 'negative',
      });
    }

    return highlights;
  }

  private createEmptyBriefingSnapshot(): BriefingAnalyticsSnapshot {
    return {
      generatedAt: new Date().toISOString(),
      totals: {
        interactions24h: 0,
        decisionsAccepted24h: 0,
        activeAlerts: 0,
      },
      trend: {
        interactions: [],
        decisions: [],
        alertsAcknowledged: [],
      },
      highlights: [],
      recentActivity: [],
    };
  }

  private createEmptyReportSnapshot(): ReportAnalyticsSnapshot {
    return {
      generatedAt: new Date().toISOString(),
      overview: {
        interactionsThisWeek: 0,
        alertsCreatedThisWeek: 0,
        alertsAcknowledgedThisWeek: 0,
        decisionsAcceptanceRate: 0,
      },
      timeseries: {
        interactions: [],
        decisions: [],
        alerts: [],
        alertsAcknowledged: [],
      },
      decisionOutcomes: [],
      interactionSources: [],
    };
  }

  private cloneBriefingSnapshot(): BriefingAnalyticsSnapshot {
    return JSON.parse(JSON.stringify(this.briefingSnapshot));
  }

  private cloneReportSnapshot(): ReportAnalyticsSnapshot {
    return JSON.parse(JSON.stringify(this.reportSnapshot));
  }

  private generateId(): string {
    return `evt_${Math.random().toString(36).slice(2, 10)}`;
  }
}
