import { ActionService } from '../actions/service';
import { MemoryService } from '../memory/service';
import { MemoryEmbeddingRepository } from '../memory/embedding-repository';
import { AgentResponse, ChatMessage, MemoryEmbeddingMatch, RAGPipelineContext } from './models';
import { OpenAIChatService, OpenAIEmbeddingService } from './openai-service';

export interface RAGPipelineOptions {
  globalContext?: string[];
  memoryLimit?: number;
  recentItemsLimit?: number;
  knowledgeBaseMatchCount?: number;
  knowledgeBaseMinSimilarity?: number;
}

export interface GenerateResponseParams {
  organizationId: string;
  query: string;
  conversation?: ChatMessage[];
  globalOverrides?: string[];
}

export class RAGPipeline {
  private readonly options: Required<Omit<RAGPipelineOptions, 'globalContext'>>;

  constructor(
    private readonly chatService: OpenAIChatService,
    private readonly embeddingService: OpenAIEmbeddingService | undefined,
    private readonly memoryRepository: MemoryEmbeddingRepository | undefined,
    private readonly memoryService: MemoryService,
    private readonly actionService: ActionService,
    options: RAGPipelineOptions = {},
  ) {
    this.options = {
      memoryLimit: options.memoryLimit ?? 8,
      recentItemsLimit: options.recentItemsLimit ?? 5,
      knowledgeBaseMatchCount: options.knowledgeBaseMatchCount ?? 6,
      knowledgeBaseMinSimilarity: options.knowledgeBaseMinSimilarity ?? 0.7,
    };

    this.globalContext = options.globalContext ?? this.readGlobalContextFromEnv();
  }

  private globalContext: string[];

  async generateResponse(params: GenerateResponseParams): Promise<AgentResponse> {
    const context = await this.buildContext(params);

    const systemPrompt = `Eres un asesor empresarial que utiliza memoria a largo plazo, datos operativos y documentos institucionales
para responder con precisión y claridad. Cuando no exista información suficiente debes indicarlo.`;

    const contextBlock = this.composeContextBlock(context);

    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      ...this.limitConversationHistory(params.conversation),
      {
        role: 'user',
        content: `Contexto disponible:\n${contextBlock}\n\nPregunta o solicitud:\n${params.query}`,
      },
    ];

    const response = await this.chatService.generateCompletion(messages, {
      responseFormat: 'text',
    });

    return {
      answer: response.content.trim(),
      context,
      model: response.model,
      reasoning: response.reasoning,
    };
  }

  private async buildContext(params: GenerateResponseParams): Promise<RAGPipelineContext> {
    const { organizationId, query } = params;

    const [globalContext, memoryUpdates, recentInsights, knowledgeBase] = await Promise.all([
      Promise.resolve(params.globalOverrides ?? this.globalContext),
      Promise.resolve(this.extractMemoryUpdates()),
      Promise.resolve(this.extractRecentInsights()),
      this.retrieveKnowledgeBaseMatches(organizationId, query),
    ]);

    return {
      globalContext,
      memoryUpdates,
      recentInsights,
      knowledgeBase,
    };
  }

  private readGlobalContextFromEnv(): string[] {
    const value = process.env.AGENTE_GLOBAL_CONTEXT ?? '';
    if (!value) {
      return [];
    }

    return value
      .split(/\n+/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  private extractMemoryUpdates(): string[] {
    return this.memoryService
      .listUpdates()
      .slice(0, this.options.memoryLimit)
      .map((update) => `(${update.createdAt}) ${update.author}: ${update.summary}`);
  }

  private extractRecentInsights(): string[] {
    const tasks = this.actionService.listTasks();
    const alerts = this.actionService.listAlerts();

    const openTasks = tasks
      .filter((task) => task.status !== 'completed')
      .slice(0, this.options.recentItemsLimit)
      .map((task) => `Tarea: ${task.title} [${task.priority}] - estado: ${task.status}${task.dueDate ? `, vence ${task.dueDate}` : ''}`);

    const activeAlerts = alerts
      .filter((alert) => !alert.acknowledged)
      .slice(0, this.options.recentItemsLimit)
      .map((alert) => `Alerta (${alert.type}): ${alert.message}`);

    return [...openTasks, ...activeAlerts];
  }

  private async retrieveKnowledgeBaseMatches(organizationId: string, query: string): Promise<MemoryEmbeddingMatch[]> {
    if (!this.embeddingService || !this.memoryRepository) {
      return [];
    }

    const [queryEmbedding] = await this.embeddingService.createEmbeddings({ input: [query] });

    try {
      return await this.memoryRepository.matchEmbeddings({
        organizationId,
        queryEmbedding,
        matchCount: this.options.knowledgeBaseMatchCount,
        minSimilarity: this.options.knowledgeBaseMinSimilarity,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error retrieving embedding matches', error);
      return [];
    }
  }

  private composeContextBlock(context: RAGPipelineContext): string {
    const sections: string[] = [];

    if (context.globalContext.length > 0) {
      sections.push(`Contexto estratégico:\n- ${context.globalContext.join('\n- ')}`);
    }

    if (context.memoryUpdates.length > 0) {
      sections.push(`Memoria del agente:\n- ${context.memoryUpdates.join('\n- ')}`);
    }

    if (context.recentInsights.length > 0) {
      sections.push(`Datos operativos recientes:\n- ${context.recentInsights.join('\n- ')}`);
    }

    if (context.knowledgeBase.length > 0) {
      const formatted = context.knowledgeBase
        .map((match) => `(${(match.similarity * 100).toFixed(1)}%) ${match.content}`)
        .join('\n- ');
      sections.push(`Conocimiento documental relevante:\n- ${formatted}`);
    }

    if (sections.length === 0) {
      return 'No se encontró contexto adicional. Responde con base en la información provista por el usuario.';
    }

    return sections.join('\n\n');
  }

  private limitConversationHistory(history: ChatMessage[] | undefined): ChatMessage[] {
    if (!history || history.length === 0) {
      return [];
    }

    return history.slice(-8);
  }
}
