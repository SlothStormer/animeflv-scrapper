import type { LatestAnime } from "../types";
import { load } from "cheerio";

export async function extractLatest(response: Response): Promise<LatestAnime[]> {
    const $ = load(await response.text());
    const $ul = $("ul.ListEpisodios");
    let info: LatestAnime[] = [];
  
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
}