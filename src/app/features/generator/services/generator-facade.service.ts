import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { MovieApiService } from '../../movies/api/movie.api';
import { GeneratorStateService } from '../state/generator-state.service';
import { Person } from '../types/generator.type';
import { Movie } from '../../movies/types/movie.type';
import { CarouselItem } from 'src/app/shared/components/carousel/carousel.component';
import { MovieStateService } from '../../movies/state/movie.state';

@Injectable({
  providedIn: 'root'
})
export class GeneratorFacadeService {
  private readonly apiService = inject(MovieApiService);
  private readonly state = inject(GeneratorStateService);
  private readonly movieState = inject(MovieStateService);

  filmography$: Observable<CarouselItem[]> = this.state.generatorState$.pipe(
    map(state => this.mapMoviesToCarouselItems(state.filmography))
  );

  loading$: Observable<boolean> = this.state.generatorState$.pipe(
    map(state => state.loading)
  );

  selectedPersonName$: Observable<string | null> = this.state.generatorState$.pipe(
    map(state => state.selectedPerson?.name ?? null)
  );

  searchPersonAndGetFilmography(query: string): void {
    this.state.setLoading(true);
    this.state.setError(null);
    this.state.setState({ filmography: [], selectedPerson: null });

    this.apiService.searchPerson(query).pipe(
      tap(response => {
        const person = response.results[0];
        if (person) {
          this.state.setState({ selectedPerson: person });
          this.getFilmography(person.id);
        } else {
          this.state.setLoading(false);
          this.state.setError('Nenhuma pessoa encontrada.');
        }
      })
    ).subscribe({
      error: (err) => {
        this.state.setLoading(false);
        this.state.setError('Erro ao buscar a pessoa.');
        console.error(err);
      }
    });
  }

  private getFilmography(personId: number): void {
    this.apiService.getPersonFilmography(personId).pipe(
      tap(response => {
        const filmography = [...response.cast, ...response.crew];
        const uniqueFilmography = Array.from(new Map(filmography.map(movie => [movie.id, movie])).values());
        
        this.state.setState({ filmography: uniqueFilmography, loading: false });
      })
    ).subscribe({
      error: (err) => {
        this.state.setLoading(false);
        this.state.setError('Erro ao buscar a filmografia.');
        console.error(err);
      }
    });
  }
  
  private mapMoviesToCarouselItems(movies: Movie[]): CarouselItem[] {
    
    const allGenres = this.movieState.getState().genres;

    if (!allGenres.length) {
      console.warn('Lista de gêneros não está disponível no MovieState.');
    }

    return movies.map(movie => {
      const genreNames = movie.genre_ids
        .map(id => allGenres.find(g => g.id === id)?.name)
        .filter((name): name is string => !!name); // Filtra caso algum ID não seja encontrado

      return {
        id: movie.id,
        title: movie.title,
        imgSrc: movie.poster_path,
        link: `/movies/${movie.id}`,
        rating: (movie.vote_average / 10) * 100,
        vote: movie.vote_average,
        release_date: movie.release_date,
        popularity: movie.popularity,
        genre_ids: movie.genre_ids,
        genres: genreNames.join(', ') 
      };
    });
  }
}