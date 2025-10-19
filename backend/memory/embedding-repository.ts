import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { MemoryEmbeddingMatch } from '../intelligence/models';

export interface MemoryEmbeddingRecord {
  id?: string;
  organization_id: string;
  document_id: string;
  chunk_id: string;
  content: string;
  embedding: number[];
  metadata?: Record<string, unknown>;
  source?: string;
}

export interface MatchEmbeddingsParams {
  organizationId: string;
  queryEmbedding: number[];
  matchCount?: number;
  minSimilarity?: number;
}

export class MemoryEmbeddingRepository {
  private readonly client: SupabaseClient;

  constructor(client?: SupabaseClient) {
    if (client) {
      this.client = client;
      return;
    }

    const url = process.env.SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const anonKey = process.env.SUPABASE_ANON_KEY;

    if (!url || (!serviceRoleKey && !anonKey)) {
      throw new Error('Supabase credentials are required to initialise MemoryEmbeddingRepository.');
    }

    const key = serviceRoleKey ?? anonKey ?? '';
    this.client = createClient(url, key, { auth: { persistSession: false } });
  }

  async upsertEmbeddings(records: MemoryEmbeddingRecord[]): Promise<void> {
    if (records.length === 0) {
      return;
    }

    const batches = this.chunk(records, 50);

    for (const batch of batches) {
      const { error } = await this.client.from('memory.embedding').upsert(
        batch.map((item) => ({
          ...item,
          metadata: item.metadata ?? {},
        })),
      );

      if (error) {
        throw error;
      }
    }
  }

  async matchEmbeddings(params: MatchEmbeddingsParams): Promise<MemoryEmbeddingMatch[]> {
    const { organizationId, queryEmbedding, matchCount = 8, minSimilarity = 0.75 } = params;

    const { data, error } = await this.client.rpc('match_memory_embeddings', {
      input_embedding: queryEmbedding,
      match_count: matchCount,
      similarity_threshold: minSimilarity,
      organization_id: organizationId,
    });

    if (error) {
      throw error;
    }

    return (data ?? []).map((item: any) => ({
      id: item.id,
      documentId: item.document_id,
      chunkId: item.chunk_id,
      organizationId: item.organization_id,
      content: item.content,
      metadata: item.metadata ?? undefined,
      similarity: item.similarity ?? item.score ?? 0,
    }));
  }

  private chunk<T>(items: T[], size: number): T[][] {
    const result: T[][] = [];
    for (let index = 0; index < items.length; index += size) {
      result.push(items.slice(index, index + size));
    }
    return result;
  }
}
