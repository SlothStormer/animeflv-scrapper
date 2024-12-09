import { load } from "cheerio";
import type { OnAirAnime } from "../types";

export async function extractOnAir(response: Response): Promise<OnAirAnime[]> {
    const $ = load(await response.text());
    let info: OnAirAnime[] = [];
  
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
}