const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export class RateLimiter {
  private lastExecutedAt = 0;

  private chain: Promise<unknown> = Promise.resolve();

  private readonly minimumInterval: number;

  constructor(requestsPerMinute: number) {
    if (!Number.isFinite(requestsPerMinute) || requestsPerMinute <= 0) {
      throw new Error('RateLimiter requires a positive number of requests per minute.');
    }

    this.minimumInterval = Math.ceil(60000 / requestsPerMinute);
  }

  schedule<T>(fn: () => Promise<T>): Promise<T> {
    const run = async (): Promise<T> => {
      const now = Date.now();
      const waitTime = Math.max(0, this.lastExecutedAt + this.minimumInterval - now);

      if (waitTime > 0) {
        await sleep(waitTime);
      }

      try {
        const result = await fn();
        return result;
      } finally {
        this.lastExecutedAt = Date.now();
      }
    };

    this.chain = this.chain.then(run, run);
    return this.chain as Promise<T>;
  }
}
