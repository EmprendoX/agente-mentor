import { ActionService } from '../actions/service';
import { AnalyticsService } from '../analytics/service';
import { MemoryService } from '../memory/service';
import { RAGPipeline } from '../intelligence/rag-pipeline';
import { AgentRecommendation, DailyBriefing, GenerateRecommendationInput } from './models';
import { OpenAIChatService } from '../intelligence/openai-service';
import { ChatMessage, RAGPipelineContext } from '../intelligence/models';

export class AgentsService {
  constructor(
    private readonly actionService: ActionService,
    private readonly memoryService: MemoryService,
    private readonly analyticsService: AnalyticsService,
    private readonly ragPipeline?: RAGPipeline,
    private readonly chatService?: OpenAIChatService,
  ) {}

  getDailyBriefing(date = new Date()): DailyBriefing {
    const tasks = this.actionService.listTasks().filter((task) => {
      if (task.status === 'completed') {
        return false;
      }

      if (!task.dueDate) {
        return true;
      }

      return this.isSameDay(new Date(task.dueDate), date);
    });

    const activeAlerts = this.actionService.listAlerts().filter((alert) => !alert.acknowledged);
    const latestUpdates = this.memoryService.listUpdates().slice(0, 5);

    const headline = this.buildHeadline(tasks.length, activeAlerts.length, latestUpdates.length);
    const briefing: DailyBriefing = {
      date: date.toISOString(),
      headline,
      tasksDue: tasks,
      activeAlerts,
      latestUpdates,
    };

    this.analyticsService.recordEvent('briefing.generated', {
      date: briefing.date,
      tasks: tasks.length,
      alerts: activeAlerts.length,
      updates: latestUpdates.length,
    });

    return briefing;
  }

  async generateRecommendation(input: GenerateRecommendationInput): Promise<AgentRecommendation> {
    if (this.ragPipeline) {
      const result = await this.ragPipeline.generateResponse({
        organizationId: input.organizationId,
        query: input.query,
        conversation: input.conversation,
        globalOverrides: input.globalOverrides,
      });

      this.analyticsService.recordInteraction('agent.recommendation', {
        organizationId: input.organizationId,
        model: result.model,
        status: 'success',
        mode: 'rag',
      });

      return result;
    }

    if (this.chatService) {
      const context = this.buildFallbackContext(input);
      const systemPrompt =
        'Eres un asesor empresarial estratégico que ofrece respuestas accionables basadas en contexto operativo y memoria reciente. Si falta información, reconoce las limitaciones y sugiere cómo obtenerla.';

      const messages: ChatMessage[] = [
        { role: 'system', content: systemPrompt },
        ...this.limitConversationHistory(input.conversation),
        {
          role: 'user',
          content: `Contexto disponible:\n${this.composeContextBlock(context)}\n\nPregunta o solicitud:\n${input.query}`,
        },
      ];

      const response = await this.chatService.generateCompletion(messages, {
        responseFormat: 'text',
      });

      const recommendation: AgentRecommendation = {
        answer: response.content.trim(),
        model: response.model,
        reasoning: response.reasoning,
        context,
      };

      this.analyticsService.recordInteraction('agent.recommendation', {
        organizationId: input.organizationId,
        model: recommendation.model,
        status: 'success',
        mode: 'chat-basic',
      });

      return recommendation;
    }

    const fallback: AgentRecommendation = {
      answer: 'La orquestación con IA no está configurada en este entorno.',
      model: 'offline',
      context: {
        globalContext: [],
        memoryUpdates: [],
        recentInsights: [],
        knowledgeBase: [],
      },
    };

    this.analyticsService.recordInteraction('agent.recommendation', {
      organizationId: input.organizationId,
      model: fallback.model,
      status: 'unavailable',
    });

    return fallback;
  }

  private buildHeadline(tasks: number, alerts: number, updates: number): string {
    const segments: string[] = [];

    if (tasks > 0) {
      segments.push(`${tasks} tareas pendientes`);
    }

    if (alerts > 0) {
      segments.push(`${alerts} alertas activas`);
    }

    if (updates > 0) {
      segments.push(`${updates} novedades recientes`);
    }

    if (segments.length === 0) {
      return 'Sin novedades: todas las tareas y alertas están al día.';
    }

    return `Resumen del día: ${segments.join(', ')}.`;
  }

  private isSameDay(a: Date, b: Date): boolean {
    return a.getUTCFullYear() === b.getUTCFullYear() && a.getUTCMonth() === b.getUTCMonth() && a.getUTCDate() === b.getUTCDate();
  }

  private buildFallbackContext(input: GenerateRecommendationInput): RAGPipelineContext {
    const globalContext =
      input.globalOverrides && input.globalOverrides.length > 0
        ? input.globalOverrides
        : this.readGlobalContextFromEnv();

    const memoryUpdates = this.memoryService
      .listUpdates()
      .slice(0, 8)
      .map((update) => `(${update.createdAt}) ${update.author}: ${update.summary}`);

    const recentInsights = this.extractRecentInsights();

    return {
      globalContext,
      memoryUpdates,
      recentInsights,
      knowledgeBase: [],
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

  private extractRecentInsights(): string[] {
    const tasks = this.actionService.listTasks();
    const alerts = this.actionService.listAlerts();

    const openTasks = tasks
      .filter((task) => task.status !== 'completed')
      .slice(0, 5)
      .map((task) =>
        `Tarea: ${task.title} [${task.priority}] - estado: ${task.status}${
          task.dueDate ? `, vence ${task.dueDate}` : ''
        }`,
      );

    const activeAlerts = alerts
      .filter((alert) => !alert.acknowledged)
      .slice(0, 5)
      .map((alert) => `Alerta (${alert.type}): ${alert.message}`);

    return [...openTasks, ...activeAlerts];
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
