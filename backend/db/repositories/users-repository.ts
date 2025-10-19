import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseRepository } from './base-repository';

export interface UserRecord {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserInput {
  email: string;
  fullName?: string;
  avatarUrl?: string;
}

export interface UpdateUserInput {
  fullName?: string | null;
  avatarUrl?: string | null;
}

interface UserRow {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export class UsersRepository extends BaseSupabaseRepository {
  constructor(client?: SupabaseClient) {
    super(client);
  }

  async list(): Promise<UserRecord[]> {
    const { data, error } = await this.client
      .from<UserRow>('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    const rows: UserRow[] = data ?? [];
    return rows.map((row) => this.mapRow(row));
  }

  async findById(id: string): Promise<UserRecord | null> {
    const { data, error } = await this.client
      .from<UserRow>('users')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data ? this.mapRow(data) : null;
  }

  async findByEmail(email: string): Promise<UserRecord | null> {
    const { data, error } = await this.client
      .from<UserRow>('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data ? this.mapRow(data) : null;
  }

  async create(input: CreateUserInput): Promise<UserRecord> {
    const now = new Date().toISOString();
    const payload = {
      email: input.email,
      full_name: input.fullName ?? null,
      avatar_url: input.avatarUrl ?? null,
      created_at: now,
      updated_at: now,
    } satisfies Partial<UserRow>;

    const { data, error } = await this.client
      .from<UserRow>('users')
      .insert(payload)
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    return this.mapRow(data);
  }

  async update(id: string, input: UpdateUserInput): Promise<UserRecord> {
    const updatePayload: Partial<UserRow> = {
      full_name: input.fullName ?? null,
      avatar_url: input.avatarUrl ?? null,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await this.client
      .from<UserRow>('users')
      .update(updatePayload)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    return this.mapRow(data);
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.client.from('users').delete().eq('id', id);
    if (error) {
      throw error;
    }
  }

  private mapRow(row: UserRow): UserRecord {
    return {
      id: row.id,
      email: row.email,
      fullName: row.full_name ?? undefined,
      avatarUrl: row.avatar_url ?? undefined,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}
