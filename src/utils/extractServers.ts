import { load } from "cheerio";
import type { EpisodeServers } from "../types";

export async function extractServers(
  response: Response
): Promise<EpisodeServers | null> {
  const $ = load(await response.text());
  const scripts = $("script:not([src])");
  let episodes: EpisodeServers = {
    servers: [],
    prevEpUrl: undefined,
    nextEpUrl: undefined,
  };

  scripts.each((index, script) => {
    const content = $(script).html(); // Obtén el contenido del script
    if (content?.includes("var videos")) {
      const episodesMath = content?.match(/var videos = (.*?);/);
      episodes.servers = episodesMath ? JSON.parse(episodesMath[1]).SUB : null;
    }
  });

  if (episodes.servers.length === 0) return null;
  episodes.prevEpUrl = $("a.CapNvPv").attr("href");
  episodes.nextEpUrl = $("a.CapNvNx").attr("href");
  return episodes;
}
