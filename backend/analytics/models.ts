export interface AnalyticsEvent<TPayload = Record<string, unknown>> {
  id: string;
  type: string;
  timestamp: string;
  payload?: TPayload;
}
