export interface AnalyticsEvent<TPayload = Record<string, unknown>> {
  id: string;
  type: string;
  timestamp: string;
  payload?: TPayload;
}

export interface TimeSeriesPoint {
  date: string;
  value: number;
}

export type HighlightImpact = 'positive' | 'negative' | 'neutral';

export interface BriefingHighlight {
  label: string;
  description: string;
  impact: HighlightImpact;
}

export interface BriefingAnalyticsSnapshot {
  generatedAt: string;
  totals: {
    interactions24h: number;
    decisionsAccepted24h: number;
    activeAlerts: number;
  };
  trend: {
    interactions: TimeSeriesPoint[];
    decisions: TimeSeriesPoint[];
    alertsAcknowledged: TimeSeriesPoint[];
  };
  highlights: BriefingHighlight[];
  recentActivity: AnalyticsEvent[];
}

export interface CategoryBreakdownItem {
  label: string;
  value: number;
}

export interface ReportAnalyticsSnapshot {
  generatedAt: string;
  overview: {
    interactionsThisWeek: number;
    alertsCreatedThisWeek: number;
    alertsAcknowledgedThisWeek: number;
    decisionsAcceptanceRate: number;
  };
  timeseries: {
    interactions: TimeSeriesPoint[];
    decisions: TimeSeriesPoint[];
    alerts: TimeSeriesPoint[];
    alertsAcknowledged: TimeSeriesPoint[];
  };
  decisionOutcomes: CategoryBreakdownItem[];
  interactionSources: CategoryBreakdownItem[];
}
