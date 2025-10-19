import OpenAI from 'openai';
import { ChatCompletionOptions, ChatMessage, EmbeddingRequest } from './models';
import { RateLimiter } from './rate-limiter';
import { retryWithBackoff, RetryOptions } from './retry';

export interface OpenAIServiceConfig {
  apiKey?: string;
  baseURL?: string;
  chatModel?: string;
  embeddingModel?: string;
  rpmChat?: number;
  rpmEmbeddings?: number;
  retry?: RetryOptions;
}

const DEFAULT_CHAT_MODEL = process.env.OPENAI_CHAT_MODEL ?? 'gpt-4o-mini';
const DEFAULT_EMBEDDING_MODEL = process.env.OPENAI_EMBEDDING_MODEL ?? 'text-embedding-3-large';
const DEFAULT_CHAT_RPM = Number(process.env.OPENAI_CHAT_RPM ?? 60);
const DEFAULT_EMBEDDING_RPM = Number(process.env.OPENAI_EMBEDDING_RPM ?? 100);

export class OpenAIService {
  private readonly client: OpenAI;

  readonly config: Required<Pick<OpenAIServiceConfig, 'chatModel' | 'embeddingModel'>>;

  constructor(private readonly options: OpenAIServiceConfig = {}) {
    const apiKey = options.apiKey ?? process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is required to initialise OpenAIService.');
    }

    this.client = new OpenAI({
      apiKey,
      baseURL: options.baseURL ?? process.env.OPENAI_BASE_URL,
    });

    this.config = {
      chatModel: options.chatModel ?? DEFAULT_CHAT_MODEL,
      embeddingModel: options.embeddingModel ?? DEFAULT_EMBEDDING_MODEL,
    };
  }

  createChatClient(): OpenAIChatService {
    return new OpenAIChatService({
      client: this.client,
      model: this.config.chatModel,
      rateLimiter: new RateLimiter(this.options.rpmChat ?? DEFAULT_CHAT_RPM),
      retry: this.options.retry,
    });
  }

  createEmbeddingClient(): OpenAIEmbeddingService {
    return new OpenAIEmbeddingService({
      client: this.client,
      model: this.config.embeddingModel,
      rateLimiter: new RateLimiter(this.options.rpmEmbeddings ?? DEFAULT_EMBEDDING_RPM),
      retry: this.options.retry,
    });
  }
}

interface BaseClientOptions {
  client: OpenAI;
  rateLimiter: RateLimiter;
  retry?: RetryOptions;
}

interface ChatClientOptions extends BaseClientOptions {
  model: string;
}

export class OpenAIChatService {
  constructor(private readonly options: ChatClientOptions) {}

  async generateCompletion(messages: ChatMessage[], options: ChatCompletionOptions = {}): Promise<{ content: string; reasoning?: string; model: string }>
  {
    const payload = {
      model: options.model ?? this.options.model,
      messages,
      temperature: options.temperature ?? 0.7,
      max_output_tokens: options.maxOutputTokens,
      response_format: options.responseFormat ? { type: options.responseFormat } : undefined,
    };

    return this.options.rateLimiter.schedule(() =>
      retryWithBackoff(
        async () => {
          const messagesPayload = payload.messages.map((message) => {
            if (message.role === 'tool') {
              return {
                role: 'tool' as const,
                content: message.content,
                tool_call_id: message.toolCallId ?? 'tool_call_unknown',
              };
            }

            return { role: message.role, content: message.content } as const;
          });

          const response = await this.options.client.chat.completions.create({
            model: payload.model,
            messages: messagesPayload,
            temperature: payload.temperature,
            max_tokens: payload.max_output_tokens,
            response_format: payload.response_format,
          });

          const choice = response.choices?.[0];
          const message = choice?.message;

          const reasoning = Array.isArray((message as any)?.reasoning)
            ? ((message as any).reasoning as Array<{ type: string; text?: string }>)
                .map((item) => item.text)
                .filter(Boolean)
                .join('\n')
            : undefined;

          return {
            content: message?.content ?? '',
            reasoning,
            model: response.model ?? payload.model,
          };
        },
        this.options.retry,
      ),
    );
  }
}

interface EmbeddingClientOptions extends BaseClientOptions {
  model: string;
}

export class OpenAIEmbeddingService {
  constructor(private readonly options: EmbeddingClientOptions) {}

  async createEmbeddings({ input, model }: EmbeddingRequest): Promise<number[][]> {
    return this.options.rateLimiter.schedule(() =>
      retryWithBackoff(
        async () => {
          const response = await this.options.client.embeddings.create({
            input,
            model: model ?? this.options.model,
          });

          return response.data.map((item) => item.embedding);
        },
        this.options.retry,
      ),
    );
  }
}
