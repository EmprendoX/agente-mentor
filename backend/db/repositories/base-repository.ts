import { createClient, SupabaseClient } from '@supabase/supabase-js';

export class BaseSupabaseRepository {
  protected readonly client: SupabaseClient;

  constructor(client?: SupabaseClient) {
    if (client) {
      this.client = client;
      return;
    }

    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY;

    if (!url || !key) {
      throw new Error('Supabase credentials are required to initialise the repository.');
    }

    this.client = createClient(url, key, { auth: { persistSession: false } });
  }
}
