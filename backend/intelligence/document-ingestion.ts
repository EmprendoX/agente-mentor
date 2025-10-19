import { OpenAIEmbeddingService } from './openai-service';
import { DocumentChunk, EnterpriseDocument } from './models';
import { MemoryEmbeddingRecord, MemoryEmbeddingRepository } from '../memory/embedding-repository';

export interface DocumentIngestionOptions {
  chunkSizeTokens?: number;
  chunkOverlapTokens?: number;
}

const DEFAULT_CHUNK_SIZE = 800;
const DEFAULT_CHUNK_OVERLAP = 120;

const estimateTokenCount = (text: string): number => {
  if (!text) {
    return 0;
  }

  const words = text.trim().split(/\s+/);
  return Math.ceil(words.length * 1.35);
};

const chunkText = (text: string, chunkSize: number, chunkOverlap: number): string[] => {
  const words = text.trim().split(/\s+/);
  const chunks: string[] = [];

  let start = 0;
  while (start < words.length) {
    const end = Math.min(words.length, start + chunkSize);
    const chunk = words.slice(start, end).join(' ');
    chunks.push(chunk);
    if (end === words.length) {
      break;
    }

    start = Math.max(0, end - chunkOverlap);
  }

  return chunks.filter((item) => item.trim().length > 0);
};

const createChunkId = (documentId: string, index: number): string => `${documentId}::${index.toString().padStart(4, '0')}`;

export class DocumentIngestionService {
  constructor(
    private readonly embeddingService: OpenAIEmbeddingService,
    private readonly repository: MemoryEmbeddingRepository,
  ) {}

  async ingestDocuments(documents: EnterpriseDocument[], options: DocumentIngestionOptions = {}): Promise<{ chunks: number }>
  {
    const chunkSize = options.chunkSizeTokens ?? DEFAULT_CHUNK_SIZE;
    const chunkOverlap = options.chunkOverlapTokens ?? DEFAULT_CHUNK_OVERLAP;

    const chunks = documents.flatMap((document) => this.splitDocumentIntoChunks(document, chunkSize, chunkOverlap));

    if (chunks.length === 0) {
      return { chunks: 0 };
    }

    const embeddings = await this.embeddingService.createEmbeddings({ input: chunks.map((chunk) => chunk.content) });

    const records: MemoryEmbeddingRecord[] = chunks.map((chunk, index) => ({
      organization_id: chunk.organizationId,
      document_id: chunk.documentId,
      chunk_id: chunk.id,
      content: chunk.content,
      embedding: embeddings[index],
      metadata: chunk.metadata,
    }));

    await this.repository.upsertEmbeddings(records);

    return { chunks: chunks.length };
  }

  private splitDocumentIntoChunks(
    document: EnterpriseDocument,
    chunkSizeTokens: number,
    chunkOverlapTokens: number,
  ): DocumentChunk[] {
    const rawChunks = chunkText(document.content, chunkSizeTokens, chunkOverlapTokens);

    return rawChunks.map((content, index) => ({
      id: createChunkId(document.id, index),
      documentId: document.id,
      organizationId: document.organizationId,
      content,
      tokenCount: estimateTokenCount(content),
      metadata: {
        title: document.title,
        source: document.source,
        ...document.metadata,
      },
    }));
  }
}
