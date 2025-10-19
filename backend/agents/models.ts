import { Alert, Task } from '../actions/models';
import { AgentResponse, ChatMessage } from '../intelligence/models';
import { ContextUpdate } from '../memory/models';

export interface DailyBriefing {
  date: string;
  headline: string;
  tasksDue: Task[];
  activeAlerts: Alert[];
  latestUpdates: ContextUpdate[];
}

export interface GenerateRecommendationInput {
  organizationId: string;
  query: string;
  conversation?: ChatMessage[];
  globalOverrides?: string[];
}

export type AgentRecommendation = AgentResponse;
