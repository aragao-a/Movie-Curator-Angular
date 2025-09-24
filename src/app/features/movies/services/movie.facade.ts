import { Injectable, inject } from '@angular/core';
import { MovieApiService } from '../api/movie.api';
import { MovieStateService } from '../state/movie.state';
import { catchError, tap, map } from 'rxjs/operators';
import { of, combineLatest } from 'rxjs';
import { Movie, Genre } from '../types/movie.type';
import { CarouselItem } from '@shared/components/carousel/carousel.component';

@Injectable({
  providedIn: 'root'
})
export class MovieFacade {
  private api = inject(MovieApiService);
  public state = inject(MovieStateService);
  private genres$ = this.state.movies$.pipe(map(state => state.genres));

  popularMovies$ = combineLatest([
    this.state.movies$.pipe(map(state => state.popularMovies)),
    this.genres$
  ]).pipe(map(([movies, genres]) => this.mapToCarouselItems(movies, genres)));

  topRatedMovies$ = combineLatest([
    this.state.movies$.pipe(map(state => state.topRatedMovies)),
    this.genres$
  ]).pipe(map(([movies, genres]) => this.mapToCarouselItems(movies, genres)));

  upcomingMovies$ = combineLatest([
    this.state.movies$.pipe(map(state => state.upcomingMovies)),
    this.genres$
  ]).pipe(map(([movies, genres]) => this.mapToCarouselItems(movies, genres)));

  searchResults$ = this.state.movies$.pipe(map(state => state.searchResults));
  
  isLoading$ = this.state.movies$.pipe(map(state => state.loading));
  error$ = this.state.movies$.pipe(map(state => state.error));

  loadGenres() {
    this.api.getGenres().pipe(
      map(response => response.genres),
      catchError(() => of([]))
    ).subscribe(genres => {
      this.state.setState({ genres });
    });
  }

  loadInitialCarousels() {
    this.state.setState({ loading: true });

    this.api.getPopularMovies().pipe(catchError(() => of({ results: [] }))).subscribe(response => {
      this.state.setState({ popularMovies: response.results });
    });

    this.api.getTopRatedMovies().pipe(catchError(() => of({ results: [] }))).subscribe(response => {
      this.state.setState({ topRatedMovies: response.results });
    });

    this.api.getUpcomingMovies().pipe(catchError(() => of({ results: [] }))).subscribe(response => {
      this.state.setState({ upcomingMovies: response.results, loading: false }); // Desliga o loading no último
    });
  }
  
  searchMovies(query: string) {
    if (!query) {
      this.state.setState({ searchResults: [] });
      return;
    }
    this.state.setState({ loading: true });
    this.api.searchMovies(query).pipe(
      tap(response => {
        this.state.setState({ searchResults: response.results, loading: false });
      }),
      catchError(err => {
        this.state.setState({ error: 'Failed to search movies.', loading: false });
        return of(null);
      })
    ).subscribe();
  }
  
  private mapToCarouselItems(movies: Movie[], genres: Genre[]): CarouselItem[] {
    if (!genres.length) return []; 

    return movies.map(movie => {
      const movieGenres = movie.genre_ids
        .map(id => genres.find(g => g.id === id)?.name) 
        .filter(Boolean) 
        .slice(0, 2) 
        .join(', '); 

      return {
        id: movie.id,
        title: movie.title,
        imgSrc: movie.poster_path,
        link: `/movie/${movie.id}`,
        rating: movie.vote_average * 10,
        vote: movie.vote_average,
        genres: movieGenres,
        genre_ids: movie.genre_ids, 
        release_date: movie.release_date,
        popularity: movie.popularity
      };
    });
  }
}