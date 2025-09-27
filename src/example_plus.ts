import { MentorXEngine, newLearnerProfile, ContentItem } from "./index";
import { decideNextHybrid } from "./recommender";

async function demoPlus() {
  const engine = new MentorXEngine();
  const profile = newLearnerProfile("learner-123");
  profile.motivation = { interests: ["space", "soccer"], goals: ["build_project", "curiosity"] };

  engine.updateArchetype(profile, {
    videoMinutes: 12,
    audioMinutes: 3,
    readingMinutes: 6,
    dragDropActions: 15,
    problemsSolved: 8,
    socialMsgs: 2,
    soloStudyMinutes: 5,
    gameTrials: 10,
  });
  engine.updateFromEmotionVector(profile, {
    engagement: 0.42,
    curiosity: 0.35,
    calm: 0.25,
    frustration: 0.3,
    neutral: 0.2,
  });

  engine.updateFromAnswer(profile, "fractions.addition", false, 6200, 0.6);
  engine.updateFromAnswer(profile, "fractions.addition", false, 6900, 0.6);
  engine.updateFromAnswer(profile, "fractions.comparison", true, 5200, 0.55);

  const catalog: ContentItem[] = [
    {
      id: "c1",
      title: "Sumas con fracciones (espacio)",
      concepts: ["fractions.addition"],
      difficulty: 0.6,
      modalities: ["visual", "kinesthetic"],
      estMinutes: 7,
      tags: ["space"],
    },
    {
      id: "c2",
      title: "Comparar fracciones (fútbol)",
      concepts: ["fractions.comparison"],
      difficulty: 0.55,
      modalities: ["gaming", "logical"],
      estMinutes: 8,
      tags: ["soccer"],
    },
    {
      id: "c3",
      title: "Problemas mixtos de fracciones",
      concepts: ["fractions.addition", "fractions.comparison"],
      difficulty: 0.7,
      modalities: ["reading_writing"],
      estMinutes: 10,
    },
  ];

  const decision = await decideNextHybrid(engine, profile, catalog, {
    enableYouTube: true,
    enablePerplexity: true,
    enableGeneration: false,
    lang: "es",
  });

  console.log(
    "NEXT ↪",
    decision.action.title,
    decision.uiHints ? ` [hints=${JSON.stringify(decision.uiHints)}]` : ""
  );
  console.log("WHY  ↪", decision.why.join(" | "));
  console.log("SCORES ↪", decision.scores);
  console.log(
    "DETECTIONS ↪",
    decision.detections.map((d) => `${d.label}:${d.score.toFixed(2)}`).join(", ")
  );
}

if (process.env.NODE_ENV !== "production") demoPlus();
