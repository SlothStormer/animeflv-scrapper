import type { SearchAnime } from "../types";
import { load } from "cheerio";

export async function extractSearch(response: Response): Promise<SearchAnime[]> {
    let searchResults: SearchAnime[] = [];
    const $ = load(await response.text());
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
}