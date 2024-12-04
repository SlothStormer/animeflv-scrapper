import type { SearchAnime } from "../types/index";
import * as cheerio from "cheerio";
import config from "../config";

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
  let searchResults: SearchAnime[] = [];
  let response;

  try {
    const formatedAnime = anime.replace(/ /g, "+"); // Oshi no ko ==> oshi+no+ko
    response = await fetch(
      config.baseUrl + config.searchUrl + `${formatedAnime}&page=${page}`
    );
  } catch (error) {
    throw new Error("Error al buscar el anime");
  }

  const $ = cheerio.load(await response.text());
  const $ul = $("ul.ListAnimes");

  for (let i = 0; i < $ul.find("article").length; i++) {
    const article = $($ul.find("article")[i]);
    searchResults.push({
      title: article.find("h3.Title").text(),
      review: parseFloat(article.find("span.Vts").text()),
      url: article.find("a").attr("href"),
      image: article.find("img").attr("src"),
      type: article.find("span.Type").html(),
    });
  }

  return searchResults;
};
