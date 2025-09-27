import { ContentItem, LearnerProfile } from "./types";
import { MentorXEngine } from "./orchestrator";
import { detectStatesFromSignals, detectionsToUiHints } from "./detections";
import { youtubeSearchByConcept } from "./providers/youtube";
import { perplexityReadingForConcept } from "./providers/perplexity";
import { generateMiniLesson } from "./providers/openai";

export interface HybridOptions {
  enableYouTube?: boolean;
  enablePerplexity?: boolean;
  enableGeneration?: boolean;
  lang?: "es" | "en";
  maxExtra?: number;
}

export async function decideNextHybrid(
  engine: MentorXEngine,
  p: LearnerProfile,
  localCatalog: ContentItem[],
  opts: HybridOptions = {
    enableYouTube: true,
    enablePerplexity: true,
    enableGeneration: false,
    lang: "es",
    maxExtra: 4,
  }
) {
  const gaps = Object.entries(p.mastery)
    .sort((a, b) => a[1].pKnown - b[1].pKnown)
    .slice(0, 2)
    .map(([cid]) => cid);

  if (gaps.length === 0 && localCatalog.length) {
    const firstConcepts = localCatalog[0].concepts.slice(0, 1);
    gaps.push(...firstConcepts);
  }

  const affect = engine.getAffect();
  const detections = detectStatesFromSignals(p, affect);
  const topDet = detections[0]?.label;

  let extra: ContentItem[] = [];
  const lang = opts.lang ?? "es";
  const interests = p.motivation?.interests ?? [];

  for (const concept of gaps) {
    if (opts.enableYouTube && (topDet === "boredom" || topDet === "fatigue")) {
      extra = extra.concat(
        await youtubeSearchByConcept(concept, lang, Math.min(3, opts.maxExtra ?? 4))
      );
    }
    if (opts.enablePerplexity && topDet !== "offline") {
      extra = extra.concat(await perplexityReadingForConcept(concept, interests, lang, 3));
    }
    if (opts.enableGeneration && extra.length === 0) {
      const mini = await generateMiniLesson(concept, "k12", lang);
      if (mini) extra.push(mini.contentItem);
    }
  }

  const pool = dedupeById([...localCatalog, ...extra]);

  const { action, why, scores } = engine.decideNext(p, pool);
  const uiHints = detectionsToUiHints(detections);

  return {
    action: { ...action, tags: [...(action.tags ?? []), ...detections.map((d) => `det:${d.label}`)] },
    why: [...why, ...detections.map((d) => `${d.label}=${d.score.toFixed(2)}`)],
    scores,
    uiHints,
    detections,
  };
}

function dedupeById(arr: ContentItem[]) {
  const seen = new Set<string>();
  return arr.filter((x) => {
    if (seen.has(x.id)) return false;
    seen.add(x.id);
    return true;
  });
}
