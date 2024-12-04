import * as cheerio from "cheerio";
import config from "../config";
import type { EpisodeInfo } from "../interfaces";

export const getEpisodeInfo = async (id: string): Promise<EpisodeInfo[]> => {
  const response = await fetch(config.baseUrl + config.episodeUrl + id);
  const $ = cheerio.load(await response.text());
  const scripts = $("script:not([src])");

  let episodes: EpisodeInfo[] = [];

  scripts.each((index, script) => {
    const content = $(script).html(); // Obtén el contenido del script
    if (content?.includes("var videos")) {
      const episodesMath = content?.match(/var videos = (.*?);/);
      const { SUB } = episodesMath ? JSON.parse(episodesMath[1]) : null;

      episodes = SUB;
    }
  });

  return episodes;
};
