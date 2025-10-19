import { EnterpriseDocument } from '../intelligence/models';

export interface ContextUpdate {
  id: string;
  summary: string;
  author: string;
  tags: string[];
  createdAt: string;
}

export interface CreateContextUpdateInput {
  summary: string;
  author: string;
  tags?: string[];
}

export interface IngestEnterpriseDocumentsInput {
  documents: EnterpriseDocument[];
  chunkSizeTokens?: number;
  chunkOverlapTokens?: number;
}
