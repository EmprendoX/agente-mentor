import { Router } from 'express';
import { AnalyticsService } from './service';

export const createAnalyticsRouter = (analyticsService: AnalyticsService): Router => {
  const router = Router();

  router.get('/analytics/events', (_req, res) => {
    res.json(analyticsService.listEvents());
  });

  return router;
};
