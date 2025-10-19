import { AnalyticsService } from '../analytics/service';
import { DocumentIngestionService } from '../intelligence/document-ingestion';
import { ContextUpdate, CreateContextUpdateInput, IngestEnterpriseDocumentsInput } from './models';

export class MemoryService {
  private readonly updates: ContextUpdate[] = [];

  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly documentIngestionService?: DocumentIngestionService,
  ) {}

  listUpdates(): ContextUpdate[] {
    return [...this.updates].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }

  addUpdate(input: CreateContextUpdateInput): ContextUpdate {
    const update: ContextUpdate = {
      id: this.generateId(),
      summary: input.summary,
      author: input.author,
      tags: input.tags ?? [],
      createdAt: new Date().toISOString(),
    };

    this.updates.push(update);
    this.analyticsService.recordEvent('context.update', { updateId: update.id, tags: update.tags });
    return update;
  }

  async ingestEnterpriseDocuments(input: IngestEnterpriseDocumentsInput): Promise<{ chunks: number }> {
    if (!this.documentIngestionService) {
      throw new Error('Document ingestion service is not configured.');
    }

    const result = await this.documentIngestionService.ingestDocuments(input.documents, {
      chunkSizeTokens: input.chunkSizeTokens,
      chunkOverlapTokens: input.chunkOverlapTokens,
    });

    this.analyticsService.recordEvent('memory.documents.ingested', {
      documents: input.documents.length,
      chunks: result.chunks,
    });

    return result;
  }

  private generateId(): string {
    return `ctx_${Math.random().toString(36).slice(2, 10)}`;
  }
}
