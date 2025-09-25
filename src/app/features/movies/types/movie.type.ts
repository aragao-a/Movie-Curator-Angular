export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  popularity: number;
  runtime?: number;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface CrewMember {
  job: string;
  name: string;
}

export interface Credits {
  crew: CrewMember[];
}

export interface MovieDetails extends Movie {
  runtime: number;
  credits: Credits;
}