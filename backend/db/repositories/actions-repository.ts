import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base-repository';

type ActionStatus = 'queued' | 'processing' | 'completed' | 'failed';

export interface ActionRecord {
  id: string;
  agentId?: string | null;
  userId: string;
  externalId?: string | null;
  type: string;
  status: ActionStatus;
  payload: Record<string, unknown>;
  metadata: Record<string, unknown>;
  result?: Record<string, unknown> | null;
  error?: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
  startedAt?: string | null;
  finishedAt?: string | null;
}

export interface CreateActionInput {
  agentId?: string | null;
  userId: string;
  externalId?: string | null;
  type: string;
  status: ActionStatus;
  payload?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface UpdateActionInput {
  status?: ActionStatus;
  metadata?: Record<string, unknown>;
  result?: Record<string, unknown> | null;
  error?: Record<string, unknown> | null;
  startedAt?: string | null;
  finishedAt?: string | null;
}

interface ActionRow {
  id: string;
  agent_id: string | null;
  user_id: string;
  external_id: string | null;
  type: string;
  status: ActionStatus;
  payload: Record<string, unknown> | null;
  metadata: Record<string, unknown> | null;
  result: Record<string, unknown> | null;
  error: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
  started_at: string | null;
  finished_at: string | null;
}

const VALID_STATUSES: ActionStatus[] = ['queued', 'processing', 'completed', 'failed'];

export class ActionsRepository extends BaseSupabaseRepository {
  constructor(client?: SupabaseClient) {
    super(client);
  }

  async listByAgent(agentId: string, limit = 50): Promise<ActionRecord[]> {
    const { data, error } = await this.client
      .from('actions')
      .select('*')
      .eq('agent_id', agentId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw error;
    }

    const rows: ActionRow[] = data ?? [];
    return rows.map((row) => this.mapRow(row));
  }

  async listByUser(userId: string, limit = 50): Promise<ActionRecord[]> {
    const { data, error } = await this.client
      .from('actions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw error;
    }

    const rows: ActionRow[] = data ?? [];
    return rows.map((row) => this.mapRow(row));
  }

  async findById(id: string): Promise<ActionRecord | null> {
    const { data, error } = await this.client
      .from('actions')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data ? this.mapRow(data) : null;
  }

  async findByExternalId(externalId: string): Promise<ActionRecord | null> {
    const { data, error } = await this.client
      .from('actions')
      .select('*')
      .eq('external_id', externalId)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data ? this.mapRow(data) : null;
  }

  async create(input: CreateActionInput): Promise<ActionRecord> {
    if (!VALID_STATUSES.includes(input.status)) {
      throw new Error(`Invalid action status: ${input.status}`);
    }

    const now = new Date().toISOString();
    const payload: Partial<ActionRow> = {
      agent_id: input.agentId ?? null,
      user_id: input.userId,
      external_id: input.externalId ?? null,
      type: input.type,
      status: input.status,
      payload: input.payload ?? {},
      metadata: input.metadata ?? {},
      created_at: now,
      updated_at: now,
    };

    const { data, error } = await this.client
      .from('actions')
      .insert(payload)
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    return this.mapRow(data);
  }

  async update(id: string, input: UpdateActionInput): Promise<ActionRecord> {
    if (input.status && !VALID_STATUSES.includes(input.status)) {
      throw new Error(`Invalid action status: ${input.status}`);
    }

    const payload: Partial<ActionRow> = {
      status: input.status,
      metadata: input.metadata,
      result: input.result ?? null,
      error: input.error ?? null,
      started_at: input.startedAt ?? null,
      finished_at: input.finishedAt ?? null,
      updated_at: new Date().toISOString(),
    };

    Object.keys(payload).forEach((key) => {
      const typedKey = key as keyof ActionRow;
      if (payload[typedKey] === undefined) {
        delete payload[typedKey];
      }
    });

    const { data, error } = await this.client
      .from('actions')
      .update(payload)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    return this.mapRow(data);
  }

  private mapRow(row: ActionRow): ActionRecord {
    return {
      id: row.id,
      agentId: row.agent_id,
      userId: row.user_id,
      externalId: row.external_id,
      type: row.type,
      status: row.status,
      payload: row.payload ?? {},
      metadata: row.metadata ?? {},
      result: row.result,
      error: row.error,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      startedAt: row.started_at,
      finishedAt: row.finished_at,
    };
  }
}
