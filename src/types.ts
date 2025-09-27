export type LearnerEvent =
  | {
      type: "ANSWER";
      conceptId: string;
      correct: boolean;
      responseTimeMs: number;
      difficulty: number;
      ts: number;
      confidence?: number;
    }
  | {
      type: "RESOURCE";
      itemId: string;
      conceptId?: string;
      status: "started" | "completed" | "skipped";
      durationMs?: number;
      ts: number;
    };

export interface MasteryState {
  pKnown: number;
  lastUpdated: number;
  exposures: number;
}

export interface MotivationProfile {
  interests: string[];
  goals?: string[];
  preferredModalities?: string[];
}

export interface LearnerProfile {
  id: string;
  history: LearnerEvent[];
  mastery: Record<string, MasteryState>;
  motivation?: MotivationProfile;
  archetype?: Record<string, number>;
  affect?: { valence: number; arousal: number; ts: number };
}

export interface ContentItem {
  id: string;
  title: string;
  concepts: string[];
  difficulty: number;
  modalities: string[];
  estMinutes: number;
  tags?: string[];
  providerId?: string;
  metadata?: Record<string, unknown>;
}
