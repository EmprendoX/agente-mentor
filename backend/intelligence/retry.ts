const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export interface RetryOptions {
  maxAttempts?: number;
  initialDelayMs?: number;
  backoffFactor?: number;
  onRetry?: (attempt: number, error: unknown) => void;
}

export const retryWithBackoff = async <T>(operation: () => Promise<T>, options: RetryOptions = {}): Promise<T> => {
  const { maxAttempts = 3, initialDelayMs = 500, backoffFactor = 2, onRetry } = options;

  let attempt = 0;
  let delay = initialDelayMs;

  while (attempt < maxAttempts) {
    try {
      return await operation();
    } catch (error) {
      attempt += 1;
      if (attempt >= maxAttempts) {
        throw error;
      }

      if (onRetry) {
        onRetry(attempt, error);
      }

      await sleep(delay);
      delay *= backoffFactor;
    }
  }

  throw new Error('Retry attempts exhausted.');
};
