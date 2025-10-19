import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ActionExecutionRecord } from './models';

export class SupabaseActionsRepository {
  private readonly client?: SupabaseClient;

  constructor() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
    if (url && key) {
      this.client = createClient(url, key, {
        auth: { autoRefreshToken: false, persistSession: false },
      });
    }
  }

  async upsertExecution(record: ActionExecutionRecord): Promise<void> {
    if (!this.client) {
      return;
    }

    const { error } = await this.client.from('actions').upsert(
      {
        id: record.id,
        external_id: record.externalId ?? null,
        user_id: record.userId,
        type: record.type,
        status: record.status,
        payload: record.payload,
        result: record.result ?? null,
        error: record.error ?? null,
        metadata: record.metadata ?? null,
        started_at: record.startedAt ?? null,
        finished_at: record.finishedAt ?? null,
        connector:
          record.result && typeof record.result === 'object' && 'connector' in record.result
            ? (record.result as { connector?: string }).connector ?? null
            : null,
        updated_at: record.updatedAt,
        created_at: record.createdAt,
      },
      { onConflict: 'id' },
    );

    if (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to upsert action execution into Supabase:', error.message);
    }
  }
}
