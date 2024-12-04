export interface LatestAnime {
    title: string;
    episode: string;
    url: string | undefined;
    image: string | undefined;
  }
  
  export interface SearchAnime {
    title: string;
    url: string | undefined;
    image: string | undefined;
    review: number;
    type: string | null;
  }
  
  export interface AnimeEpisodeInfo {
    episode: number;
    url: string | undefined;
  }
  
  export interface NextEpisode {
    episode: number;
    release: string;
  }
  
  export interface AnimeInfo {
    title: string | null;
    description: string;
    genres: string[];
    episodes: AnimeEpisodeInfo[] | null;
    rating: number;
    nextEpisode: NextEpisode | null;
    status: string;
    relatedAnime: relatedAnime[] | null;
  }
  
  export interface relatedAnime {
    title: string | null;
    url: string | undefined;
    relation: string;
  }
  
  export interface EpisodeInfo {
    server: string;
    title: string;
    ads: number;
    allow_mobile: boolean;
    code: string;
    url: string | undefined;
  }
  
  export interface OnAirAnime {
    title: string;
    type: string;
  }