import type { EpisodeServer } from "../types/index";
import * as cheerio from "cheerio";
import config from "../config";

/**
 * Devuelve los servidores donde se encuentra el episodio del anime
 * 
 * @param {string} id - ID del episodio
 * @returns {Promise<EpisodeServer[]>} Una promesa que resuelve con la informacion de los servers en un array de objetos 'EpisodeServer'
 * 
 * @example
 * const episodes = await getEpisodeServer("one-piece-1");
 * // Output:
 * [
 *   {
 *     title: "Title",
 *     url: "www3.animeflv.net/title.mp4",
 *     image: "www3.animeflv.net/title.jpg"
 *   },
 *   {
 *     title: "Title",
 *     url: "www3.animeflv.net/title.mp4",
 *     image: "www3.animeflv.net/title.jpg"
 *   },
 *   {...},
 * ]
 */
export const getEpisodeServers = async (id: string): Promise<EpisodeServer[]> => {
  const response = await fetch(config.baseUrl + config.episodeUrl + id);
  const $ = cheerio.load(await response.text());
  const scripts = $("script:not([src])");

  let episodes: EpisodeServer[] = [];

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
