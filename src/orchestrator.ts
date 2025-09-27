import { ContentItem, LearnerEvent, LearnerProfile } from "./types";
import { clamp, movingAverage } from "./utils";
import { computeEngagement } from "./engagement";

interface EngineConfig {
  guess: number;
  slip: number;
  learn: number;
  maxHistory: number;
}

interface DecisionResult {
  action: ContentItem;
  why: string[];
  scores: Record<string, number>;
}

class AffectSmoother {
  private valence = 0.5;
  private arousal = 0.5;

  update(valence: number, arousal: number) {
    this.valence = movingAverage(this.valence, clamp(valence), 0.35);
    this.arousal = movingAverage(this.arousal, clamp(arousal), 0.35);
  }

  getValence() {
    return this.valence;
  }

  getArousal() {
    return this.arousal;
  }
}

function createEmptyProfile(id: string): LearnerProfile {
  return {
    id,
    history: [],
    mastery: {},
  };
}

export class MentorXEngine {
  private config: EngineConfig;
  protected smoother: AffectSmoother;

  constructor(config: Partial<EngineConfig> = {}) {
    this.config = {
      guess: 0.2,
      slip: 0.1,
      learn: 0.15,
      maxHistory: 500,
      ...config,
    };
    this.smoother = new AffectSmoother();
  }

  newProfile(id: string): LearnerProfile {
    return createEmptyProfile(id);
  }

  updateArchetype(profile: LearnerProfile, signals: Record<string, number>) {
    const updated = { ...(profile.archetype ?? {}) };
    for (const [key, value] of Object.entries(signals)) {
      const prev = updated[key] ?? value;
      updated[key] = movingAverage(prev, value, 0.4);
    }
    profile.archetype = updated;
  }

  updateFromEmotionVector(
    profile: LearnerProfile,
    vector: Record<string, number>
  ) {
    const valence = clamp(
      0.5 + (vector.engagement ?? 0) * 0.25 + (vector.curiosity ?? 0) * 0.2 - (vector.frustration ?? 0) * 0.3
    );
    const arousal = clamp(
      0.4 + (vector.engagement ?? 0) * 0.3 + (vector.frustration ?? 0) * 0.25 - (vector.calm ?? 0) * 0.2
    );
    this.smoother.update(valence, arousal);
    profile.affect = { valence: this.smoother.getValence(), arousal: this.smoother.getArousal(), ts: Date.now() };
  }

  updateFromAnswer(
    profile: LearnerProfile,
    conceptId: string,
    correct: boolean,
    responseTimeMs: number,
    difficulty: number
  ) {
    const event: Extract<LearnerEvent, { type: "ANSWER" }> = {
      type: "ANSWER",
      conceptId,
      correct,
      responseTimeMs,
      difficulty,
      ts: Date.now(),
    };
    profile.history.push(event);
    if (profile.history.length > this.config.maxHistory) {
      profile.history.splice(0, profile.history.length - this.config.maxHistory);
    }

    const mastery = profile.mastery[conceptId] ?? {
      pKnown: 0.35,
      lastUpdated: Date.now(),
      exposures: 0,
    };

    const posterior = this.updateMastery(mastery.pKnown, correct);
    profile.mastery[conceptId] = {
      pKnown: posterior,
      lastUpdated: Date.now(),
      exposures: mastery.exposures + 1,
    };

    const affect = computeEngagement(profile.history, this.smoother.getValence(), this.smoother.getArousal());
    profile.affect = { valence: affect.parts.affect, arousal: affect.parts.attention, ts: Date.now() };
  }

  decideNext(profile: LearnerProfile, catalog: ContentItem[]): DecisionResult {
    if (!catalog.length) {
      throw new Error("El catálogo está vacío");
    }

    const scores: Record<string, number> = {};

    for (const item of catalog) {
      const masteryScores = item.concepts.map((concept) => profile.mastery[concept]?.pKnown ?? 0.35);
      const masteryGap = 1 - (masteryScores.reduce((a, b) => a + b, 0) / (masteryScores.length || 1));

      const difficultyMatch = clamp(1 - Math.abs((item.difficulty ?? 0.6) - (1 - masteryGap)));
      const interestBoost = this.computeInterestBoost(profile, item);
      const affect = profile.affect?.valence ?? 0.5;
      const affectAdjustment = clamp(0.4 + affect * 0.6);

      const score = clamp(masteryGap * 0.5 + difficultyMatch * 0.25 + interestBoost * 0.15 + affectAdjustment * 0.1);
      scores[item.id] = score;
    }

    const [bestId, bestScore] = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
    const action = catalog.find((item) => item.id === bestId)!;

    const why = [
      `gap=${(1 - (profile.mastery[action.concepts[0]]?.pKnown ?? 0.35)).toFixed(2)}`,
      `score=${bestScore.toFixed(2)}`,
      ...(profile.motivation?.interests?.some((interest) => action.tags?.includes(interest))
        ? ["match=interest"]
        : []),
    ];

    return { action, why, scores };
  }

  private updateMastery(prior: number, correct: boolean) {
    const { guess, slip, learn } = this.config;
    let posterior: number;
    if (correct) {
      const numerator = prior * (1 - slip);
      const denominator = numerator + (1 - prior) * guess;
      posterior = denominator === 0 ? prior : numerator / denominator;
    } else {
      const numerator = prior * slip;
      const denominator = numerator + (1 - prior) * (1 - guess);
      posterior = denominator === 0 ? prior : numerator / denominator;
    }
    posterior = posterior + (1 - posterior) * learn;
    return clamp(posterior);
  }

  private computeInterestBoost(profile: LearnerProfile, item: ContentItem) {
    const interests = profile.motivation?.interests ?? [];
    if (!interests.length || !item.tags?.length) return 0.4;
    const match = item.tags.some((tag) => interests.includes(tag));
    return match ? 0.8 : 0.4;
  }
}

export function newLearnerProfile(id: string): LearnerProfile {
  return createEmptyProfile(id);
}
