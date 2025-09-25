import { Movie } from '../../movies/types/movie.type';

export interface Person {
  id: number;
  name: string;
  profile_path: string;
  known_for_department: string;
}

export interface PersonSearchResponse {
  results: Person[];
}

export interface PersonFilmographyResponse {
  cast: Movie[];
  crew: Movie[];
}