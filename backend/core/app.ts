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
import { createGraphQLHandler } from './graphql';
import { createOpenAPIDocument } from './openapi';

export const createApp = (): Application => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  const analyticsService = new AnalyticsService();
  const actionService = new ActionService(analyticsService);
  const memoryService = new MemoryService(analyticsService);
  const agentsService = new AgentsService(actionService, memoryService, analyticsService);

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
