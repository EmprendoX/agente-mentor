export type AgentConversationRole = 'user' | 'assistant';

export interface AgentConversationMessage {
  role: AgentConversationRole;
  content: string;
}

export interface AgentKnowledgeBaseMetadata {
  title?: string;
  source?: string;
  [key: string]: unknown;
}

export interface AgentKnowledgeBaseMatch {
  id: string;
  documentId: string;
  chunkId: string;
  organizationId: string;
  content: string;
  similarity: number;
  metadata?: AgentKnowledgeBaseMetadata;
}

export interface AgentContextSnapshot {
  globalContext: string[];
  memoryUpdates: string[];
  recentInsights: string[];
  knowledgeBase: AgentKnowledgeBaseMatch[];
}

export interface AgentRecommendationResponse {
  answer: string;
  model: string;
  reasoning?: string;
  context: AgentContextSnapshot;
}

export interface AgentChatRequest {
  organizationId: string;
  query: string;
  conversation?: AgentConversationMessage[];
  globalOverrides?: string[];
}
