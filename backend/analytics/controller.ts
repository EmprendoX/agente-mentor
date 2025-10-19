import { Router } from 'express';
import { AnalyticsService } from './service';

export const createAnalyticsRouter = (analyticsService: AnalyticsService): Router => {
  const router = Router();

  router.get('/analytics/events', (_req, res) => {
    res.json(analyticsService.listEvents());
  });

  router.get('/analytics/briefing', (_req, res) => {
    res.json(analyticsService.getBriefingSnapshot());
  });

  router.get('/analytics/reports', (_req, res) => {
    res.json(analyticsService.getReportSnapshot());
  });

  return router;
};
