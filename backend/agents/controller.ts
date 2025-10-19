import { Router } from 'express';
import { ChatMessage } from '../intelligence/models';
import { AgentsService } from './service';

export const createAgentsRouter = (agentsService: AgentsService): Router => {
  const router = Router();

  router.get('/briefing/daily', (req, res) => {
    const { date } = req.query;
    const targetDate = typeof date === 'string' ? new Date(date) : undefined;

    if (targetDate && Number.isNaN(targetDate.getTime())) {
      return res.status(400).json({ message: 'Formato de fecha inválido.' });
    }

    const briefing = agentsService.getDailyBriefing(targetDate ?? new Date());
    return res.json(briefing);
  });

  router.post('/agents/respond', async (req, res) => {
    const { organizationId, query, conversation, globalOverrides } = req.body as {
      organizationId?: string;
      query?: string;
      conversation?: ChatMessage[];
      globalOverrides?: string[];
    };

    if (!organizationId || !query) {
      return res.status(400).json({ message: 'Los campos "organizationId" y "query" son obligatorios.' });
    }

    try {
      const response = await agentsService.generateRecommendation({
        organizationId,
        query,
        conversation,
        globalOverrides,
      });
      return res.json(response);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error generating agent response', error);
      return res.status(500).json({ message: 'No se pudo generar una respuesta en este momento.' });
    }
  });

  return router;
};
