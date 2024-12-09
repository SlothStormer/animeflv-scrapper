import { extractSearch } from "../utils/extractSearch";
import type { SearchAnime } from "../types/index";
import config from "../config";
import { isTauri } from "@tauri-apps/api/core";
import { fetch as tauriFetch } from "@tauri-apps/plugin-http";

/**
 * Busca un anime en la base de datos de AnimeFLV
 *
 * @param {string} anime - Nombre del anime a buscar
 * @param {number} [page=1] - (Opcional) Página a buscar
 * @returns {Promise<SearchAnime[]>} Una promesa que resuelve a un array de objetos `SearchAnime` con los resultados de la búsqueda.
 *
 * @example
 * const anime = await searchAnime("one-piece");
 * // Output: [{ title: 'One Piece', url: '/anime/one-piece', image: 'https://www.animeflv.net/images/anime/one-piece.jpg', review: 8.5, type: 'Anime', }]
 *
 * @throws {Error} Si no se puede acceder al sitio web.
 */
export const searchAnime = async (
  anime: string,
  page: number = 1
): Promise<SearchAnime[]> => {
  if (!anime) throw new Error("Anime is required");
  try {
    const formatedAnime = anime.replace(/ /g, "+"); // Oshi no ko ==> oshi+no+ko
    const url =
      config.baseUrl + config.searchUrl + `${formatedAnime}&page=${page}`;
    const response = isTauri() ? await tauriFetch(url) : await fetch(url);
    return extractSearch(response);
  } catch (error) {
    throw new Error("Error al buscar el anime");
  }
};
