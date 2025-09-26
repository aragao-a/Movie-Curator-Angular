import { Component, OnInit, inject } from '@angular/core';
import { MovieFacade } from '../../services/movie.facade';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap, map} from 'rxjs/operators';
import { CarouselComponent } from '@shared/components/carousel/carousel.component';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { Observable } from 'rxjs';
import { Movie, Genre } from '../../types/movie.type';
import { MarathonFacadeService } from 'src/app/features/marathon/services/marathon-facade.service';
import { CarouselItem } from '@shared/components/carousel/carousel.component';
import { MovieCategory } from '../../state/movie.state';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    AsyncPipe, 
    MovieCardComponent, 
    ReactiveFormsModule,
    CarouselComponent,
  ]
})
export class MovieListComponent implements OnInit {
  facade = inject(MovieFacade);
  marathonFacade = inject(MarathonFacadeService);
  searchControl = new FormControl('');

  searchResults$: Observable<Movie[]> = this.facade.searchResults$;

  genres$: Observable<Genre[]> = this.facade.state.movies$.pipe(map(state => state.genres));
  
  handleAddMovie(movie: Movie | CarouselItem) {
    let itemToAdd: CarouselItem;

    if ('link' in movie) {
      itemToAdd = movie;
    } else {
      
      itemToAdd = {
        id: movie.id,
        title: movie.title,
        imgSrc: movie.poster_path, 
        link: `/movies/${movie.id}`,
        vote: movie.vote_average,
        genre_ids: movie.genre_ids,
        release_date: movie.release_date,
        popularity: movie.popularity
      };
    }
    
    this.marathonFacade.addMovie(itemToAdd);
  }

  handleSortByRuntime(category: MovieCategory) {
    this.facade.fetchRuntimesFor(category);
  }
  
  ngOnInit() {
    this.facade.loadGenres(); 
    this.facade.loadInitialCarousels();

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(query => this.facade.searchMovies(query || ''))
    ).subscribe();
  }
}