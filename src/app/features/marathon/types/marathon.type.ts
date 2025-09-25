
import { Movie } from "../../movies/types/movie.type";

export interface MarathonMovie extends Movie {
  runtime?: number;
  director?: string;
}