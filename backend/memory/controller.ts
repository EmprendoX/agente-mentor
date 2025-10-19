import { Router } from 'express';
import { EnterpriseDocument } from '../intelligence/models';
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

  router.post('/memory/documents/ingest', async (req, res) => {
    const { documents, chunkSizeTokens, chunkOverlapTokens } = req.body as {
      documents?: unknown;
      chunkSizeTokens?: number;
      chunkOverlapTokens?: number;
    };

    if (!Array.isArray(documents) || documents.length === 0) {
      return res.status(400).json({ message: 'El payload "documents" es requerido y debe ser un arreglo.' });
    }

    try {
      const result = await memoryService.ingestEnterpriseDocuments({
        documents: documents as EnterpriseDocument[],
        chunkSizeTokens,
        chunkOverlapTokens,
      });
      return res.status(202).json(result);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error ingesting documents', error);
      return res.status(500).json({ message: 'No se pudieron procesar los documentos proporcionados.' });
    }
  });

  return router;
};
