import { Queue, Worker, JobsOptions } from 'bullmq';
import { ActionOrchestrator, ActionRequest } from './orchestrator';
import { ActionService } from './service';

interface ActionJobData {
  request: ActionRequest;
  recordId: string;
}

const parseRedisUrl = (url: string) => {
  const redisUrl = new URL(url);
  return {
    host: redisUrl.hostname,
    port: Number(redisUrl.port || 6379),
    username: redisUrl.username || undefined,
    password: redisUrl.password || undefined,
  };
};

export class ActionQueue {
  private readonly queue?: Queue<ActionJobData>;

  private readonly worker?: Worker<ActionJobData>;

  constructor(
    private readonly actionService: ActionService,
    private readonly orchestrator: ActionOrchestrator,
    private readonly queueName = 'actions',
  ) {
    const redisUrl = process.env.REDIS_URL;
    if (redisUrl) {
      const connection = parseRedisUrl(redisUrl);
      this.queue = new Queue<ActionJobData>(queueName, { connection });
      this.worker = new Worker<ActionJobData>(
        queueName,
        async (job) => {
          await this.processJob(job.data);
        },
        { connection },
      );

      this.worker.on('failed', (job, error) => {
        if (!job) {
          return;
        }
        this.actionService.updateActionExecution(job.data.recordId, {
          status: 'failed',
          error: { message: error.message },
        });
      });
    } else {
      // eslint-disable-next-line no-console
      console.warn('REDIS_URL not configured. Using in-memory execution for actions.');
    }
  }

  async enqueue(request: ActionRequest, options: JobsOptions = {}): Promise<string> {
    const record = this.actionService.createActionExecution({
      id: request.id,
      type: request.type,
      userId: request.user.id,
      status: 'queued',
      payload: request.payload,
      metadata: request.metadata,
    });

    if (this.queue) {
      await this.queue.add(
        request.type,
        { request, recordId: record.id },
        {
          removeOnComplete: true,
          removeOnFail: true,
          ...options,
        },
      );
    } else {
      try {
        await this.processJob({ request, recordId: record.id });
      } catch (error) {
        // Already logged and persisted by processJob.
        const message = error instanceof Error ? error.message : 'Unknown error executing action.';
        // eslint-disable-next-line no-console
        console.error(`Action processing failed for ${record.id}: ${message}`);
      }
    }

    return record.id;
  }

  private async processJob(data: ActionJobData): Promise<void> {
    this.actionService.updateActionExecution(data.recordId, { status: 'processing', startedAt: new Date().toISOString() });

    try {
      const result = await this.orchestrator.execute(data.request);
      this.actionService.updateActionExecution(data.recordId, {
        status: 'completed',
        finishedAt: new Date().toISOString(),
        result,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error executing action.';
      this.actionService.updateActionExecution(data.recordId, {
        status: 'failed',
        finishedAt: new Date().toISOString(),
        error: { message },
      });
      throw error;
    }
  }

  async close(): Promise<void> {
    const closers: Promise<void>[] = [];
    if (this.worker) {
      closers.push(this.worker.close());
    }
    if (this.queue) {
      closers.push(this.queue.close());
    }
    await Promise.all(closers);
  }
}
