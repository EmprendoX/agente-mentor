import { ActionService } from '../actions/service';
import { AnalyticsService } from '../analytics/service';
import { MemoryService } from '../memory/service';
import { RAGPipeline } from '../intelligence/rag-pipeline';
import { AgentRecommendation, DailyBriefing, GenerateRecommendationInput } from './models';

export class AgentsService {
  constructor(
    private readonly actionService: ActionService,
    private readonly memoryService: MemoryService,
    private readonly analyticsService: AnalyticsService,
    private readonly ragPipeline?: RAGPipeline,
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
    if (!this.ragPipeline) {
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

      this.analyticsService.recordEvent('agent.recommendation', {
        organizationId: input.organizationId,
        model: fallback.model,
        status: 'unavailable',
      });

      return fallback;
    }

    const result = await this.ragPipeline.generateResponse({
      organizationId: input.organizationId,
      query: input.query,
      conversation: input.conversation,
      globalOverrides: input.globalOverrides,
    });

    this.analyticsService.recordEvent('agent.recommendation', {
      organizationId: input.organizationId,
      model: result.model,
      status: 'success',
    });

    return result;
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
}
