import { extractLatest } from "../utils/extractLatest";
import type { LatestAnime } from "../types/index";
import config from "../config";
import { isTauri } from "@tauri-apps/api/core";
import { fetch as tauriFetch } from "@tauri-apps/plugin-http";

/**
 * Devuelve los ultimos 20 capitulos subidos a AnimeFLV
 *
 * @returns {Promise<LatestAnime[]>} Una promesa que resuelve con los ultimos 20 capitulos subidos a AnimeFLV en un array de objetos 'LatestAnime'
 *
 * @example
 * const latestAnimes = await getLatestAnimes();
 * // Output:
 * [
 *   {
 *     title: "TitleA",
 *     episode: "20",
 *     url: "/title-a-1",
 *     image: "www3.animeflv.net/title-a-1.jpg"
 *   },
 *   {
 *     title: "TitleB",
 *     episode: "15",
 *     url: "/title-b-1",
 *     image: "www3.animeflv.net/title-b-1.jpg"
 *   },
 *   {...},
 * ]
 */
export const getLatestAnimes = async (): Promise<LatestAnime[] | null> => {
  try {
    const response = isTauri()
      ? await tauriFetch(config.baseUrl)
      : await fetch(config.baseUrl);
    return extractLatest(response);
  } catch (error) {
    return null;
  }
};
