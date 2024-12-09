import { fetch as tauriFetch } from "@tauri-apps/plugin-http";
import { extractServers } from "../utils/extractServers";
import type { EpisodeServers } from "../types/index";
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
export async function getEpisodeServers(
  id: string
): Promise<EpisodeServers | null> {
  if (!id) throw new Error("ID is required");

  try {
    const url = config.baseUrl + config.episodeUrl + id;
    const response = config.isTauri ? await tauriFetch(url) : await fetch(url);
    return extractServers(response);
  } catch (error) {
    return null;
  }
}
