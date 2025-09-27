import { v4 as uuid } from "uuid";
import { ContentItem } from "../types";

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const OA_ENDPOINT = process.env.OPENAI_ENDPOINT || "https://api.openai.com/v1/chat/completions";

export interface MiniLesson {
  id: string;
  title: string;
  markdown: string;
  estMinutes: number;
  contentItem: ContentItem;
}

export async function generateMiniLesson(
  concept: string,
  level: "k12" | "college" = "k12",
  lang = "es"
): Promise<MiniLesson | null> {
  if (!OPENAI_KEY) return null;

  const messages = [
    {
      role: "system",
      content:
        "Eres un tutor que genera mini-lecciones claras, con pasos, ejemplos, y 3 ejercicios con respuestas.",
    },
    {
      role: "user",
      content: `Crea una mini-lección en ${lang} sobre el concepto: ${concept}.
       Nivel: ${level}. Usa Markdown con títulos (##), listas y fórmulas simples si aplica.
       Termina con: 'Tiempo estimado: X minutos'.`,
    },
  ];

  const res = await fetch(OA_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_KEY}`,
    },
    body: JSON.stringify({ model: process.env.OPENAI_MODEL || "gpt-4o-mini", temperature: 0.7, messages }),
  });

  if (!res.ok) return null;
  const data = (await res.json()) as any;
  const text: string = data?.choices?.[0]?.message?.content ?? "";
  if (!text) return null;

  const minutes = (() => {
    const m = text.match(/Tiempo estimado:\s*(\d+)\s*min/iu);
    return m ? parseInt(m[1], 10) : 10;
  })();

  const id = `gen:${uuid()}`;
  return {
    id,
    title: `Mini-lección: ${concept}`,
    markdown: text,
    estMinutes: minutes,
    contentItem: {
      id,
      title: `Mini-lección: ${concept}`,
      concepts: [concept],
      difficulty: 0.58,
      modalities: ["reading_writing"],
      estMinutes: minutes,
      tags: ["generated", "openai"],
    },
  };
}
