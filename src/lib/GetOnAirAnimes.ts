import * as cheerio from "cheerio";
import type { OnAirAnime } from "../interfaces";
import config from "../config";

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
