import { LearnerEvent } from "./types";
import { clamp } from "./utils";

export interface EngagementBreakdown {
  attention: number;
  affect: number;
  momentum: number;
}

export interface EngagementScore {
  score: number;
  parts: EngagementBreakdown;
}

export function computeEngagement(
  history: LearnerEvent[],
  valence: number,
  arousal: number
): EngagementScore {
  const answers = history.filter((h): h is Extract<LearnerEvent, { type: "ANSWER" }> => h.type === "ANSWER");
  const window = answers.slice(-20);

  const correctRate = window.length
    ? window.filter((a) => a.correct).length / window.length
    : 0.6;

  const avgTime = window.length
    ? window.reduce((acc, ev) => acc + ev.responseTimeMs, 0) / window.length
    : 3500;

  const momentum = clamp(correctRate * 0.7 + clamp((6000 - avgTime) / 6000) * 0.3);
  const affect = clamp((valence * 0.6 + clamp(1 - Math.abs(arousal - 0.55) * 2) * 0.4));
  const attention = clamp((arousal * 0.6) + (momentum * 0.4));

  const score = clamp(momentum * 0.4 + affect * 0.35 + attention * 0.25);

  return {
    score,
    parts: { attention, affect, momentum },
  };
}
