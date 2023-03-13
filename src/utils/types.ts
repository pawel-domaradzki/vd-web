export interface TrendingResponse {
    adult: boolean;
    backdrop_path: string;
    first_air_date: string;
    genre_ids: [number];
    id: number;
    media_type: string;
    name?: string;
    origin_country: [string];
    original_name?: string;
    overview: string;
    popularity: number;
    poster_path?: string;
    vote_average?: number;
    vote_count?: number;
  }

  export type Maybe<T> = T | null;
  