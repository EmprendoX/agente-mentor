import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base-repository';

export interface MemoryRecord {
  id: string;
  agentId: string;
  summary: string;
  author?: string;
  tags: string[];
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface CreateMemoryInput {
  agentId: string;
  summary: string;
  author?: string;
  tags?: string[];
  metadata?: Record<string, unknown>;
}

interface MemoryRow {
  id: string;
  agent_id: string;
  summary: string;
  author: string | null;
  tags: string[] | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

export class MemoryRepository extends BaseSupabaseRepository {
  constructor(client?: SupabaseClient) {
    super(client);
  }

  async listByAgent(agentId: string, limit = 50): Promise<MemoryRecord[]> {
    const { data, error } = await this.client
      .from('memory')
      .select('*')
      .eq('agent_id', agentId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw error;
    }

    const rows: MemoryRow[] = data ?? [];
    return rows.map((row) => this.mapRow(row));
  }

  async create(input: CreateMemoryInput): Promise<MemoryRecord> {
    const payload: Partial<MemoryRow> = {
      agent_id: input.agentId,
      summary: input.summary,
      author: input.author ?? null,
      tags: input.tags ?? [],
      metadata: input.metadata ?? {},
      created_at: new Date().toISOString(),
    };

    const { data, error } = await this.client
      .from('memory')
      .insert(payload)
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    return this.mapRow(data);
  }

  private mapRow(row: MemoryRow): MemoryRecord {
    return {
      id: row.id,
      agentId: row.agent_id,
      summary: row.summary,
      author: row.author ?? undefined,
      tags: row.tags ?? [],
      metadata: row.metadata ?? {},
      createdAt: row.created_at,
    };
  }
}
