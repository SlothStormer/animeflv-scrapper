import { extractOnAir } from "../utils/extractOnAir";
import type { OnAirAnime } from "../types/index";
import config from "../config";
import { isTauri } from "@tauri-apps/api/core";
import { fetch as tauriFetch } from "@tauri-apps/plugin-http";

/**
 * Devuelve los animes en emision de AnimeFLV
 *
 * @returns {Promise<OnAirAnime[]>} Una promesa que resuelve los animes en emision subidos a AnimeFLV en un array de objetos 'OnAirAnime'
 *
 * @example
 * const onAirAnimes = await getOnAirAnimes();
 * // Output:
 * [
 *   {
 *     title: "TitleA",
 *     type: "Episodio",
 *   },
 *   {
 *     title: "TitleB",
 *     type: "Capitulo",
 *   },
 *   {...},
 * ]
 *
 */
export const getOnAirAnimes = async (): Promise<OnAirAnime[] | null> => {
  try {
    let response = isTauri()
      ? await tauriFetch(config.baseUrl)
      : await fetch(config.baseUrl);
    return extractOnAir(response);
  } catch (error) {
    return null;
  }
};
