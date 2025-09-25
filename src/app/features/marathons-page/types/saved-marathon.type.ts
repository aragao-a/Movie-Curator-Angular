import { MarathonMovie } from '../../marathon/types/marathon.type';

export interface SavedMarathon {
  id: number;
  name: string;
  totalDuration: number;
  movies: MarathonMovie[];
}