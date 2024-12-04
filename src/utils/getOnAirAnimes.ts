import type { OnAirAnime } from "../types/index";
import * as cheerio from "cheerio";
import config from "../config";

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
export const getOnAirAnimes = async (): Promise<OnAirAnime[]> => {
  let info: OnAirAnime[] = [];

  const response = await fetch(config.baseUrl);
  const html = await response.text();

  const $ = cheerio.load(html);

  const $ul = $("ul.ListSdbr");

  for (let i = 0; i < $ul.find("li").length; i++) {
    const $li = $($ul.find("li")[i]);
    const type = $li.find("span").text();
    console.log($li.find("a").text(), $li.find("span").text());

    info.push({
        title: $li.find("a").text().replace(type, "").trim(),
        type: type,
    });
  }

  return info;
};
