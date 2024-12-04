import type { LatestAnime } from "../types/index";
import * as cheerio from "cheerio";
import config from "../config";

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
  