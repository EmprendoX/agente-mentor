import { LearnerProfile, LearnerEvent } from "./types";
import { computeEngagement } from "./engagement";
import { clamp } from "./utils";

export type DetectionLabel =
  | "fatigue"
  | "boredom"
  | "frustration"
  | "flow"
  | "overload"
  | "offline";

export interface Detection {
  label: DetectionLabel;
  score: number;
  ts: number;
  evidence: string[];
}

export interface NetworkMetrics {
  latencyMs?: number;
  packetLoss?: number;
  downKbps?: number;
}

export function detectStatesFromSignals(
  p: LearnerProfile,
  affect: { valence: number; arousal: number },
  network?: NetworkMetrics
): Detection[] {
  const { valence, arousal } = affect;
  const last = p.history.slice(-60);
  const answers = last.filter((e): e is Extract<LearnerEvent, { type: "ANSWER" }> => e.type === "ANSWER");
  const wrongStreak = (() => {
    let s = 0;
    let max = 0;
    for (let i = answers.length - 1; i >= 0; i -= 1) {
      if (!answers[i].correct) {
        s += 1;
        max = Math.max(max, s);
      } else {
        break;
      }
    }
    return max;
  })();
  const rt = answers.length
    ? answers.reduce((acc, b) => acc + b.responseTimeMs, 0) / answers.length
    : 3500;
  const correctRate = answers.length ? answers.filter((a) => a.correct).length / answers.length : 0.6;

  const { parts } = computeEngagement(p.history, valence, arousal);

  const fatigue =
    clamp((0.55 - arousal) * 1.4) * 0.7 + clamp((0.45 - parts.attention) * 1.2) * 0.3;
  const boredom = clamp((0.4 - arousal) * 1.2) * 0.5 + clamp((0.05 - valence) * 1.5) * 0.5;
  const frustration =
    clamp((arousal - 0.6) * 1.3) * 0.4 +
    clamp((0.15 - valence) * 1.5) * 0.4 +
    clamp((wrongStreak >= 2 ? 0.9 : 0) + (rt > 6000 ? 0.3 : 0));
  const flow =
    clamp((valence - 0.2) * 1.2) * 0.5 +
    clamp(1 - Math.abs(arousal - 0.55) * 2) * 0.3 +
    clamp((correctRate - 0.7) * 1.2) * 0.2;
  const overload =
    clamp((arousal - 0.7) * 1.2) * 0.4 +
    clamp((0.5 - correctRate) * 1.5) * 0.4 +
    clamp((rt - 7000) / 4000);
  const offline = network
    ? clamp(
        (network.packetLoss ? (network.packetLoss - 0.12) * 2 : 0) +
          (network.downKbps ? (256 - network.downKbps) / 256 : 0) +
          (network.latencyMs ? (network.latencyMs - 800) / 800 : 0)
      )
    : 0;

  const out: Detection[] = [];
  const push = (label: DetectionLabel, score: number, evidence: string[]) => {
    if (score >= 0.6) out.push({ label, score: clamp(score), ts: Date.now(), evidence });
  };

  push("fatigue", fatigue, [
    `arousal=${arousal.toFixed(2)}`,
    `attention=${parts.attention.toFixed(2)}`,
  ]);
  push("boredom", boredom, [
    `arousal=${arousal.toFixed(2)}`,
    `valence=${valence.toFixed(2)}`,
  ]);
  push("frustration", frustration, [
    `wrongStreak=${wrongStreak}`,
    `rt=${Math.round(rt)}ms`,
    `valence=${valence.toFixed(2)}`,
  ]);
  push("flow", flow, [
    `valence=${valence.toFixed(2)}`,
    `arousal=${arousal.toFixed(2)}`,
    `correctRate=${correctRate.toFixed(2)}`,
  ]);
  push("overload", overload, [
    `arousal=${arousal.toFixed(2)}`,
    `rt=${Math.round(rt)}ms`,
    `correctRate=${correctRate.toFixed(2)}`,
  ]);
  push("offline", offline, [
    ...(network?.latencyMs ? [`latency=${Math.round(network.latencyMs)}ms`] : []),
    ...(network?.packetLoss ? [`loss=${((network.packetLoss ?? 0) * 100).toFixed(0)}%`] : []),
    ...(network?.downKbps ? [`down=${Math.round(network.downKbps)}kbps`] : []),
  ]);

  return out.sort((a, b) => b.score - a.score);
}

export function detectionsToUiHints(detections: Detection[]): {
  pace?: "slow" | "normal" | "fast";
  scaffolding?: "low" | "med" | "high";
  tone?: "warm" | "neutral" | "directive";
} {
  const top = detections[0]?.label;
  switch (top) {
    case "fatigue":
      return { pace: "slow", scaffolding: "med", tone: "warm" };
    case "boredom":
      return { pace: "fast", scaffolding: "low", tone: "warm" };
    case "frustration":
      return { pace: "slow", scaffolding: "high", tone: "warm" };
    case "overload":
      return { pace: "slow", scaffolding: "high", tone: "directive" };
    case "flow":
      return { pace: "normal", scaffolding: "low", tone: "warm" };
    default:
      return {};
  }
}
