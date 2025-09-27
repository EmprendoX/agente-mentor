import { ContentItem } from "../types";

const YT_KEY = process.env.YT_API_KEY || process.env.GOOGLE_API_KEY;

export interface YouTubeVideo {
  id: string;
  title: string;
  channelTitle: string;
  duration?: number;
}

export async function youtubeSearchByConcept(
  concept: string,
  lang = "es",
  maxResults = 4
): Promise<ContentItem[]> {
  if (!YT_KEY) return [];
  const q = encodeURIComponent(concept.replace(/\./g, " ").replace(/_/g, " "));
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${maxResults}&relevanceLanguage=${lang}&q=${q}&key=${YT_KEY}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  const items = (data.items || []) as any[];

  return items.map((it: any, i: number) => {
    const vid = it.id.videoId;
    const title = it.snippet.title as string;
    return {
      id: `yt:${vid}`,
      title,
      concepts: [concept],
      difficulty: 0.55,
      modalities: ["visual", "auditory"],
      estMinutes: 6 + i,
      tags: ["youtube", it.snippet.channelTitle],
    } satisfies ContentItem;
  });
}
