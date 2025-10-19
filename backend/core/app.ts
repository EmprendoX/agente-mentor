import express, { Application } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { createActionsRouter } from '../actions/controller';
import { ActionService } from '../actions/service';
import { createAgentsRouter } from '../agents/controller';
import { AgentsService } from '../agents/service';
import { createMemoryRouter } from '../memory/controller';
import { MemoryService } from '../memory/service';
import { createAnalyticsRouter } from '../analytics/controller';
import { AnalyticsService } from '../analytics/service';
import { OpenAIService } from '../intelligence/openai-service';
import { MemoryEmbeddingRepository } from '../memory/embedding-repository';
import { DocumentIngestionService } from '../intelligence/document-ingestion';
import { RAGPipeline } from '../intelligence/rag-pipeline';
import { createGraphQLHandler } from './graphql';
import { createOpenAPIDocument } from './openapi';
import { GmailCalendarConnector } from '../actions/connectors/gmail-calendar';
import { SlackWhatsAppConnector } from '../actions/connectors/slack-whatsapp';
import { CrmRestConnector } from '../actions/connectors/crm-rest';
import { ActionOrchestrator, ScopeAuthorizationValidator } from '../actions/orchestrator';
import { ActionQueue } from '../actions/queue';
import { SupabaseActionsRepository } from '../actions/supabase-repository';
import { createSupabaseWebhookRouter } from '../actions/webhooks';

const registerShutdownHook = (queue: ActionQueue): void => {
  const shutdown = async () => {
    await queue.close();
  };

  process.once('SIGINT', shutdown);
  process.once('SIGTERM', shutdown);
};

export const createApp = (): Application => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  const analyticsService = new AnalyticsService();
  const supabaseRepository = new SupabaseActionsRepository();
  const actionService = new ActionService(analyticsService, supabaseRepository);

  const connectors = [new GmailCalendarConnector(), new SlackWhatsAppConnector(), new CrmRestConnector()];
  const orchestrator = new ActionOrchestrator(connectors, new ScopeAuthorizationValidator());
  const actionQueue = new ActionQueue(actionService, orchestrator);
  registerShutdownHook(actionQueue);

  const openAIConfigured = Boolean(process.env.OPENAI_API_KEY);
  const supabaseConfigured = Boolean(
    process.env.SUPABASE_URL && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY),
  );

  let openAIChatClient: ReturnType<OpenAIService['createChatClient']> | undefined;
  let openAIEmbeddingClient: ReturnType<OpenAIService['createEmbeddingClient']> | undefined;
  let memoryEmbeddingRepository: MemoryEmbeddingRepository | undefined;
  let documentIngestionService: DocumentIngestionService | undefined;

  if (openAIConfigured) {
    const openAIService = new OpenAIService();
    openAIChatClient = openAIService.createChatClient();

    if (supabaseConfigured) {
      openAIEmbeddingClient = openAIService.createEmbeddingClient();
      memoryEmbeddingRepository = new MemoryEmbeddingRepository();
      documentIngestionService = new DocumentIngestionService(openAIEmbeddingClient, memoryEmbeddingRepository);
    }
  } else {
    // eslint-disable-next-line no-console
    console.warn('OPENAI_API_KEY no configurado. El agente utilizará respuestas locales.');
  }

  if (!supabaseConfigured) {
    // eslint-disable-next-line no-console
    console.warn('Supabase no configurado. La ingesta de documentos y búsqueda semántica estarán deshabilitadas.');
  }

  const memoryService = new MemoryService(analyticsService, documentIngestionService);

  const ragPipeline = openAIChatClient
    ? new RAGPipeline(
        openAIChatClient,
        openAIEmbeddingClient,
        memoryEmbeddingRepository,
        memoryService,
        actionService,
      )
    : undefined;

  const agentsService = new AgentsService(actionService, memoryService, analyticsService, ragPipeline, openAIChatClient);

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api', createSupabaseWebhookRouter(actionQueue));
  app.use('/api', createActionsRouter(actionService));
  app.use('/api', createMemoryRouter(memoryService));
  app.use('/api', createAgentsRouter(agentsService));
  app.use('/api', createAnalyticsRouter(analyticsService));

  const graphQLHandler = createGraphQLHandler({
    actionService,
    memoryService,
    agentsService,
    analyticsService,
  });
  app.use('/graphql', graphQLHandler);

  const openapiDocument = createOpenAPIDocument();
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));
  app.get('/openapi.json', (_req, res) => {
    res.json(openapiDocument);
  });

  return app;
};
