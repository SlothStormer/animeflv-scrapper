import type { AnimeInfo, EpisodeInfo } from "../types/index";
import * as cheerio from "cheerio";
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
export const getAnimeInfo = async (anime: string): Promise<AnimeInfo> => {
  try {
    console.log(config.baseUrl + config.animeUrl + anime.replace(/ /g, "-").toLowerCase())
    const response = await fetch(
      config.baseUrl + config.animeUrl + anime.replace(/ /g, "-").toLowerCase() // Oshi no ko =>> oshi-no-ko
    );
    if (!response.ok)
      throw new Error(`Error al obtener el HTML: ${response.status}`);

    const html = await response.text();
    const $ = cheerio.load(html);

    const scripts = $("script:not([src]):not([type])");

    let episodes: EpisodeInfo[] = [];
    let anime_info = {
      title: null,
      id: null,
      slug: null,
      new_chapter_date: null,
    };

    scripts.each((index, script) => {
      const content = $(script).html(); // Obtén el contenido del script
      if (content?.includes("var episodes")) {
        const animeInfoMatch = content?.match(/var anime_info = (.*?);/);
        const animeData = animeInfoMatch ? JSON.parse(animeInfoMatch[1]) : null;
        anime_info.id = animeData[0];
        anime_info.title = animeData[1];
        anime_info.slug = animeData[2];
        anime_info.new_chapter_date = animeData[3];

        const episodesMatch = content?.match(/var episodes = (.*?);/);
        const episodesInfo = episodesMatch
          ? JSON.parse(episodesMatch[1])
          : null;

        for (const episode in episodesInfo) {
          episodes.push({
            episode: parseInt(episode) + 1,
            url: "/" + anime_info.slug + `-${parseInt(episode) + 1}`,
          });
        }
      }
    });

    const relatedAnime = $("ul.ListAnmRel li")
      .map((_, el) => {
        const $li = $(el);
        const $link = $li.find("a");
        const title = $link.text();
        return {
          title,
          url: $link.attr("href") || "",
          relation: $li.text().replace(title, "").trim().replace(/[()]/g, ""),
        };
      })
      .get();

    const info: AnimeInfo = {
      title: anime_info.title,
      description: $("div.Description > p").text().trim(),
      genres: $("nav.Nvgnrs > a")
        .map((_, el) => $(el).text())
        .get(),
      episodes: episodes,
      rating: parseFloat($("span.vtprmd").text()) || 0,
      nextEpisode: anime_info.new_chapter_date,
      status: $("p.AnmStts").text().trim(),
      relatedAnime,
    };

    return info;
  } catch (error) {
    console.error("Error al obtener la información del anime:", error);
    throw error;
  }
};
