import { MentorXEngine } from "./orchestrator";

declare module "./orchestrator" {
  interface MentorXEngine {
    getAffect(): { valence: number; arousal: number };
  }
}

(MentorXEngine as any).prototype.getAffect = function getAffect() {
  const sm = (this as any).smoother;
  return { valence: sm.getValence(), arousal: sm.getArousal() };
};

export {};
