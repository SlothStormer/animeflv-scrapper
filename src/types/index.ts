export interface AnimeInfo {
  title: string | null;
  description: string;
  genres: string[];
  episodes: EpisodeInfo[] | null;
  rating: number;
  nextEpisode: NextEpisode | null;
  status: string;
  relatedAnime: RelatedAnime[] | null;
}

export interface EpisodeInfo {
  episode: number;
  url: string | undefined;
}

export interface EpisodeServer {
  server: string;
  title: string;
  ads: number;
  allow_mobile: boolean;
  code: string;
  url: string | undefined;
}

export interface EpisodeServers {
  servers: EpisodeServer[];
  prevEpUrl: string | undefined;
  nextEpUrl: string | undefined;
}

export interface LatestAnime {
  title: string;
  episode: string;
  url: string | undefined;
  image: string | undefined;
}

export interface NextEpisode {
  episode: number;
  release: string;
}

export interface OnAirAnime {
  title: string;
  type: string;
}

export interface RelatedAnime {
  title: string | null;
  url: string | undefined;
  relation: string;
}

export interface SearchAnime {
  title: string;
  url: string | undefined;
  image: string | undefined;
  review: number;
  type: string | null;
}