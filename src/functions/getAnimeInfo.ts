import type { AnimeInfo } from "../types/index";
import { extractInfo } from "../utils/extractInfo";
import config from "../config";

/**
 * Devuelve la informacion de un anime de AnimeFLV
 * 
 * @param {string} anime - Nombre del anime
 * @returns {Promise<AnimeInfo>} Una promesa que resuelve con la informacion del anime 'AnimeInfo'
 * 
 * @example
 * const anime = await getAnimeInfo("One Piece");
 * // Output:
 * {
 *   title: "One Piece",
 *   description: "Descripcion...",
 *   genres: ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Mystery", "Psychological", "Romance", "Sci-Fi", "Slice of Life", "Supernatural", "Thriller", "Tragedy"],
 *   episodes: [
 *     { episode: 1, url: "/one-piece-1" },
 *     { episode: 2, url: "/one-piece-2" },
 *     ...
 *   ],
 *   rating: 8.5,
 *   nextEpisode: "2022-01-01",
 *   status: "Ongoing",
 *   relatedAnime: [] 
 */
export const getAnimeInfo = async (anime: string): Promise<AnimeInfo | null> => {
  if (!anime) throw new Error("Anime is required");
  try {
    const url = config.baseUrl + config.animeUrl + anime.replace(/ /g, "-").toLowerCase() // "Oshi no Ko" => "oshi-no-ko"
    const response = await fetch(url);
    return extractInfo(response);
  } catch (error) {
    return null;
  }
};
