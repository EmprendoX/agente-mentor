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

export const getBriefingAnalytics = () => fetchJson<BriefingAnalyticsSnapshot>('/analytics/briefing');

export const getReportAnalytics = () => fetchJson<ReportAnalyticsSnapshot>('/analytics/reports');
