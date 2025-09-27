import { ContentItem } from "../types";

const PPLX_KEY = process.env.PPLX_API_KEY;
const PPLX_ENDPOINT = process.env.PPLX_ENDPOINT || "https://api.perplexity.ai/chat/completions";

export async function perplexityReadingForConcept(
  concept: string,
  interests: string[] = [],
  lang = "es",
  max = 3
): Promise<ContentItem[]> {
  if (!PPLX_KEY) return [];
  const prompt = [
    "Eres un curador educativo. Devuelve SOLO JSON con un array \"resources\".",
    "Cada recurso: {title, url, estMinutes, tags}.",
    `Tema/concepto: "${concept}". Intereses del alumno: ${interests.join(", ") || "ninguno"}.`,
    `Idioma preferido: ${lang}. Prioriza recursos cortos y confiables. Máximo ${max}.`,
  ].join(" ");

  const body = {
    model: process.env.PPLX_MODEL || "sonar-large-online",
    messages: [
      { role: "system", content: "Estructura y devuelve SOLO JSON válido." },
      { role: "user", content: prompt },
    ],
    temperature: 0.2,
  };

  const res = await fetch(PPLX_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${PPLX_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) return [];
  const data = (await res.json().catch(() => null)) as any;
  const content: string | undefined = data?.choices?.[0]?.message?.content;
  if (!content) return [];

  let parsed: any;
  try {
    parsed = JSON.parse(content);
  } catch {
    return [];
  }
  const resources = parsed?.resources ?? [];
  return resources.slice(0, max).map((r: any, i: number) => ({
    id: `web:${r.url || `pplx-${concept}-${i}`}`,
    title: r.title || `Lectura sobre ${concept}`,
    concepts: [concept],
    difficulty: 0.5,
    modalities: ["reading_writing"],
    estMinutes: Number(r.estMinutes) || 7,
    tags: ["perplexity", ...(Array.isArray(r.tags) ? r.tags : [])],
  }) as ContentItem);
}
