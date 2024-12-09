import { load } from "cheerio";
import type { EpisodeServer } from "../types";

export async function extractServers(
  response: Response
): Promise<EpisodeServer[] | null> {
  const $ = load(await response.text());
  const scripts = $("script:not([src])");
  let episodes: EpisodeServer[] = [];

  scripts.each((index, script) => {
    const content = $(script).html(); // Obtén el contenido del script
    if (content?.includes("var videos")) {
      const episodesMath = content?.match(/var videos = (.*?);/);
      episodes = episodesMath ? JSON.parse(episodesMath[1]).SUB : null;
    }
  });

  if (episodes.length === 0) return null;
  return episodes;
}
