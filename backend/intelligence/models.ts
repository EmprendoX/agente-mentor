export interface ChatMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  toolCallId?: string;
}

export interface ChatCompletionOptions {
  model?: string;
  temperature?: number;
  maxOutputTokens?: number;
  responseFormat?: 'text' | 'json_object';
}

export interface EmbeddingRequest {
  input: string[];
  model?: string;
}

export interface EnterpriseDocument {
  id: string;
  organizationId: string;
  title: string;
  content: string;
  metadata?: Record<string, unknown>;
  source?: string;
}

export interface DocumentChunk {
  id: string;
  documentId: string;
  organizationId: string;
  content: string;
  tokenCount: number;
  metadata?: Record<string, unknown>;
}

export interface MemoryEmbeddingMatch {
  id: string;
  documentId: string;
  chunkId: string;
  organizationId: string;
  content: string;
  metadata?: Record<string, unknown>;
  similarity: number;
}

export interface RAGPipelineContext {
  globalContext: string[];
  memoryUpdates: string[];
  recentInsights: string[];
  knowledgeBase: MemoryEmbeddingMatch[];
}

export interface AgentResponse {
  answer: string;
  context: RAGPipelineContext;
  model: string;
  reasoning?: string;
}
