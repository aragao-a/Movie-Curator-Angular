import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movie, Genre } from '../types/movie.type';

export type MovieCategory = 'popularMovies' | 'topRatedMovies' | 'upcomingMovies';

export interface MovieState {
  popularMovies: Movie[];
  topRatedMovies: Movie[];
  upcomingMovies: Movie[];
  searchResults: Movie[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  genres: Genre[];
}

const initialState: MovieState = {
  popularMovies: [],
  topRatedMovies: [],
  upcomingMovies: [],
  searchResults: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  genres: [],
};

@Injectable({
  providedIn: 'root'
})
export class MovieStateService {
  private readonly state = new BehaviorSubject<MovieState>(initialState);

  readonly movies$ = this.state.asObservable();

  getState() {
    return this.state.getValue();
  }

  setState(newState: Partial<MovieState>) {
    this.state.next({ ...this.getState(), ...newState });
  }

  setLoading(loading: boolean) {
    this.setState({ loading });
  }

  setError(error: string | null) {
    this.setState({ error });
  }

  setPagination(page: number, totalPages: number) {
    this.setState({ page, totalPages });
  }
}