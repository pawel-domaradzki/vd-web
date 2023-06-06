export interface ResultsResponse {
  adult: boolean;
  backdrop_path?: string;
  first_air_date?: string;
  release_date?: string;
  genre_ids: [number];
  id: number;
  media_type: string;
  name?: string;
  title?: string;
  origin_country: [string];
  original_name?: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  vote_average?: number;
  vote_count?: number;
}

export interface Results {
  results: ResultsResponse[];
  title?: string;
}

export type Maybe<T> = T | null;
