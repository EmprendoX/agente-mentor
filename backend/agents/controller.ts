import { Router } from 'express';
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

  return router;
};
