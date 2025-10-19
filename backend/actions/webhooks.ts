import crypto from 'crypto';
import { Router } from 'express';
import { ActionQueue } from './queue';
import { ActionRequest } from './orchestrator';

type SupabaseWebhookType = 'INSERT' | 'UPDATE';

interface SupabaseWebhookRecord {
  id: string;
  user_id: string;
  action_type: string;
  payload: Record<string, unknown> | string | null;
  scopes?: string[] | string | null;
  credentials?: Record<string, string> | string | null;
  metadata?: Record<string, unknown> | string | null;
}

interface SupabaseWebhookBody {
  type: SupabaseWebhookType;
  record: SupabaseWebhookRecord;
}

const parseMaybeJson = <T>(value: T | string | null | undefined): T | undefined => {
  if (value == null) {
    return undefined;
  }
  if (typeof value === 'string') {
    try {
      return JSON.parse(value) as T;
    } catch (error) {
      throw new Error('Invalid JSON format received from Supabase webhook.');
    }
  }
  return value as T;
};

const verifySupabaseSignature = (body: unknown, signature: string | undefined, secret: string | undefined): boolean => {
  if (!secret) {
    return true;
  }
  if (!signature) {
    return false;
  }
  const payload = JSON.stringify(body);
  const computed = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  const received = Buffer.from(signature, 'hex');
  const expected = Buffer.from(computed, 'hex');
  if (received.length !== expected.length) {
    return false;
  }
  return crypto.timingSafeEqual(received, expected);
};

const parseRecord = (record: SupabaseWebhookRecord): ActionRequest => {
  const payload = parseMaybeJson<Record<string, unknown>>(record.payload) ?? {};
  const scopes = parseMaybeJson<string[]>(record.scopes) ?? [];
  const credentials = parseMaybeJson<Record<string, string>>(record.credentials) ?? {};
  const metadata = parseMaybeJson<Record<string, unknown>>(record.metadata);

  return {
    id: record.id,
    type: record.action_type,
    payload,
    user: {
      id: record.user_id,
      scopes,
      credentials,
    },
    metadata,
  };
};

export const createSupabaseWebhookRouter = (queue: ActionQueue): Router => {
  const router = Router();

  router.post('/webhooks/supabase/actions', async (req, res) => {
    const signature = req.header('x-supabase-signature');
    const secret = process.env.SUPABASE_WEBHOOK_SECRET;

    if (!verifySupabaseSignature(req.body, signature ?? undefined, secret)) {
      return res.status(401).json({ message: 'Invalid Supabase signature.' });
    }

    const payload = req.body as SupabaseWebhookBody;
    if (!payload?.record?.id || !payload.record.action_type) {
      return res.status(400).json({ message: 'Invalid Supabase webhook payload.' });
    }

    let actionRequest: ActionRequest;
    try {
      actionRequest = parseRecord(payload.record);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown parse error.';
      return res.status(400).json({ message });
    }

    await queue.enqueue(actionRequest);

    return res.status(202).json({ message: 'Action received', actionId: actionRequest.id });
  });

  return router;
};
