import { isTauri } from "@tauri-apps/api/core";
import config from "./config";

export type {
  AnimeInfo,
  EpisodeInfo,
  EpisodeServer,
  LatestAnime,
  NextEpisode,
  OnAirAnime,
  RelatedAnime,
  SearchAnime,
} from "./types";
export * from "./functions";

(async () => {
  try {
    config.isTauri = isTauri();
  } catch (error) {}
  console.log(
    config.isTauri
      ? "AnimeFLV Scrapper iniciado utilizando Tauri"
      : "AnimeFLV Scrapper inicializado en modo nativo"
  );
})();
