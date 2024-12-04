import type { LatestAnime } from "../types/index";
import * as cheerio from "cheerio";
import config from "../config";

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
export const getLatestAnimes = async (): Promise<LatestAnime[]> => {
    let info: LatestAnime[] = [];
  
    const response = await fetch(config.baseUrl);
    const html = await response.text();
  
    const $ = cheerio.load(html);
  
    const $ul = $("ul.ListEpisodios");
  
    for (let i = 0; i < $ul.find("li").length; i++) {
      const $li = $($ul.find("li")[i]);  
      info.push({
        title: $li.find("strong").text(),
        episode: $li.find("span").text(),
        url: $li.find("a").attr("href"),
        image: "www3.animeflv.net" + $li.find("img").attr("src"),
      });
    }
  
    return info;
  };
  