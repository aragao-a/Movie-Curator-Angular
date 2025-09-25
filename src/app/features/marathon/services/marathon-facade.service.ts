import { inject, Injectable } from '@angular/core';
import { MarathonStateService } from '../state/marathon-state.service';
import { MovieApiService } from '../../movies/api/movie.api';
import { map, take } from 'rxjs/operators';
import { MarathonMovie } from '../types/marathon.type';
import { CarouselItem } from '@shared/components/carousel/carousel.component';

@Injectable({
  providedIn: 'root'
})
export class MarathonFacadeService {
  private state = inject(MarathonStateService);
  private movieApi = inject(MovieApiService);

  marathonMovies$ = this.state.marathon$.pipe(map(state => state.movies));

  totalDuration$ = this.state.marathon$.pipe(
    map(state => state.movies.reduce((total, movie) => total + (movie.runtime || 0), 0))
  );

  addMovie(movie: CarouselItem) {
    this.movieApi.getMovieDetails(movie.id).pipe(
      take(1)
    ).subscribe(details => {
      const currentState = this.state.getState();
      const movieExists = currentState.movies.find(m => m.id === movie.id);

      if (!movieExists) {
        const director = details.credits?.crew.find(person => person.job === 'Director');
        
        const marathonMovie: MarathonMovie = {
          ...movie,
          id: movie.id,
          title: movie.title || '',
          poster_path: movie.imgSrc || '',
          overview: '',
          release_date: movie.release_date || '',
          vote_average: movie.vote || 0,
          genre_ids: movie.genre_ids || [],
          popularity: movie.popularity || 0,
          runtime: details.runtime,
          director: director?.name
        };

        this.state.setState({ movies: [...currentState.movies, marathonMovie] });
      }
    });
  }

  removeMovie(movieId: number) {
    const currentState = this.state.getState();
    const updatedMovies = currentState.movies.filter(movie => movie.id !== movieId);
    this.state.setState({ movies: updatedMovies });
  }

  clearCurrentMarathon() {
    this.state.setState({ movies: [] });
  }
}