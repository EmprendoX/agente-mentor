import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base-repository';

export interface AgentRecord {
  id: string;
  userId: string;
  name: string;
  description?: string;
  persona?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAgentInput {
  userId: string;
  name: string;
  description?: string;
  persona?: string;
  isActive?: boolean;
}

export interface UpdateAgentInput {
  name?: string;
  description?: string | null;
  persona?: string | null;
  isActive?: boolean;
}

interface AgentRow {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  persona: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export class AgentsRepository extends BaseSupabaseRepository {
  constructor(client?: SupabaseClient) {
    super(client);
  }

  async listAll(): Promise<AgentRecord[]> {
    const { data, error } = await this.client
      .from<AgentRow>('agents')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    const rows: AgentRow[] = data ?? [];
    return rows.map((row) => this.mapRow(row));
  }

  async listByUserId(userId: string): Promise<AgentRecord[]> {
    const { data, error } = await this.client
      .from<AgentRow>('agents')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    const rows: AgentRow[] = data ?? [];
    return rows.map((row) => this.mapRow(row));
  }

  async findById(id: string): Promise<AgentRecord | null> {
    const { data, error } = await this.client
      .from<AgentRow>('agents')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data ? this.mapRow(data) : null;
  }

  async findByName(name: string): Promise<AgentRecord | null> {
    const { data, error } = await this.client
      .from<AgentRow>('agents')
      .select('*')
      .eq('name', name)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data ? this.mapRow(data) : null;
  }

  async create(input: CreateAgentInput): Promise<AgentRecord> {
    const now = new Date().toISOString();
    const payload: Partial<AgentRow> = {
      user_id: input.userId,
      name: input.name,
      description: input.description ?? null,
      persona: input.persona ?? null,
      is_active: input.isActive ?? true,
      created_at: now,
      updated_at: now,
    };

    const { data, error } = await this.client
      .from<AgentRow>('agents')
      .insert(payload)
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    return this.mapRow(data);
  }

  async update(id: string, input: UpdateAgentInput): Promise<AgentRecord> {
    const payload: Partial<AgentRow> = {
      name: input.name,
      description: input.description ?? null,
      persona: input.persona ?? null,
      is_active: input.isActive,
      updated_at: new Date().toISOString(),
    };

    // Remove undefined values to avoid overriding columns unintentionally
    Object.keys(payload).forEach((key) => {
      const typedKey = key as keyof AgentRow;
      if (payload[typedKey] === undefined) {
        delete payload[typedKey];
      }
    });

    const { data, error } = await this.client
      .from<AgentRow>('agents')
      .update(payload)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    return this.mapRow(data);
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.client.from('agents').delete().eq('id', id);
    if (error) {
      throw error;
    }
  }

  private mapRow(row: AgentRow): AgentRecord {
    return {
      id: row.id,
      userId: row.user_id,
      name: row.name,
      description: row.description ?? undefined,
      persona: row.persona ?? undefined,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}
