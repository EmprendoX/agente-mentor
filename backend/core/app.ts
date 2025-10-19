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

export const createApp = (): Application => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  const analyticsService = new AnalyticsService();
  const actionService = new ActionService(analyticsService);

  const openAIConfigured = Boolean(process.env.OPENAI_API_KEY);
  const supabaseConfigured = Boolean(
    process.env.SUPABASE_URL && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY),
  );

  let memoryService: MemoryService;
  let ragPipeline: RAGPipeline | undefined;

  if (openAIConfigured && supabaseConfigured) {
    const openAIService = new OpenAIService();
    const openAIChatClient = openAIService.createChatClient();
    const openAIEmbeddingClient = openAIService.createEmbeddingClient();

    const memoryEmbeddingRepository = new MemoryEmbeddingRepository();
    const documentIngestionService = new DocumentIngestionService(openAIEmbeddingClient, memoryEmbeddingRepository);
    memoryService = new MemoryService(analyticsService, documentIngestionService);

    ragPipeline = new RAGPipeline(
      openAIChatClient,
      openAIEmbeddingClient,
      memoryEmbeddingRepository,
      memoryService,
      actionService,
    );
  } else {
    memoryService = new MemoryService(analyticsService);
    if (!openAIConfigured) {
      // eslint-disable-next-line no-console
      console.warn('OPENAI_API_KEY no configurado. El agente utilizará respuestas locales.');
    }
    if (!supabaseConfigured) {
      // eslint-disable-next-line no-console
      console.warn('Supabase no configurado. La ingesta de documentos y búsqueda semántica estarán deshabilitadas.');
    }
  }

  const agentsService = new AgentsService(actionService, memoryService, analyticsService, ragPipeline);

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

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
