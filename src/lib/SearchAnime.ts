import * as cheerio from "cheerio";
import type { SearchAnime } from "../interfaces";
import config from "../config";

export const searchAnime = async (anime: string, page: number = 1): Promise<SearchAnime[]> => {
    let searchResults: SearchAnime[] = [];
  
    const formatedAnime = anime.replace(/ /g, "+"); // Oshi no ko ==> oshi+no+ko
    const response = await fetch(
      config.baseUrl + config.searchUrl + `${formatedAnime}&page=${page}`
    );
  
    const $ = cheerio.load(await response.text());
    const $ul = $("ul.ListAnimes");
  
    for (let i = 0; i < $ul.find("article").length; i++) {
      const article = $($ul.find("article")[i]);
      searchResults.push({
          title: article.find("h3.Title").text(),
          review: parseFloat(article.find("span.Vts").text()),
          url: article.find("a").attr("href"),
          image: article.find("img").attr("src"),
          type: article.find("span.Type").html()
          });
    }
  
    return searchResults;
  };
  