import { Router } from 'express';
import { MemoryService } from './service';

export const createMemoryRouter = (memoryService: MemoryService): Router => {
  const router = Router();

  router.get('/context', (_req, res) => {
    res.json(memoryService.listUpdates());
  });

  router.post('/context', (req, res) => {
    const { summary, author, tags } = req.body as {
      summary?: string;
      author?: string;
      tags?: string[];
    };

    if (!summary || !author) {
      return res.status(400).json({ message: 'Los campos "summary" y "author" son obligatorios.' });
    }

    const update = memoryService.addUpdate({ summary, author, tags });
    return res.status(201).json(update);
  });

  return router;
};
