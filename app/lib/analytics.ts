import type {
  BriefingAnalyticsSnapshot,
  ReportAnalyticsSnapshot,
} from '@/app/types/analytics';

const DEFAULT_BACKEND_URL = 'http://localhost:4000/api';

const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? DEFAULT_BACKEND_URL;

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${backendBaseUrl}${path}`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Error al consultar ${path}`);
  }

  return (await response.json()) as T;
}

export const getBriefingAnalytics = async () => {
  // In producción sin backend configurado, evita llamadas a localhost
  const isLocalBackend = backendBaseUrl.includes('localhost');
  if (typeof window !== 'undefined' && isLocalBackend && process.env.NODE_ENV === 'production') {
    const empty: BriefingAnalyticsSnapshot = {
      generatedAt: new Date().toISOString(),
      totals: { interactions24h: 0, decisionsAccepted24h: 0, activeAlerts: 0 },
      trend: { interactions: [], decisions: [], alertsAcknowledged: [] },
      highlights: [],
      recentActivity: [],
    };
    return empty;
  }

  return fetchJson<BriefingAnalyticsSnapshot>('/analytics/briefing');
};

export const getReportAnalytics = async () => {
  const isLocalBackend = backendBaseUrl.includes('localhost');
  if (typeof window !== 'undefined' && isLocalBackend && process.env.NODE_ENV === 'production') {
    const empty: ReportAnalyticsSnapshot = {
      generatedAt: new Date().toISOString(),
      overview: {
        interactionsThisWeek: 0,
        alertsCreatedThisWeek: 0,
        alertsAcknowledgedThisWeek: 0,
        decisionsAcceptanceRate: 0,
      },
      timeseries: { interactions: [], decisions: [], alerts: [], alertsAcknowledged: [] },
      decisionOutcomes: [],
      interactionSources: [],
    };
    return empty;
  }

  return fetchJson<ReportAnalyticsSnapshot>('/analytics/reports');
};
