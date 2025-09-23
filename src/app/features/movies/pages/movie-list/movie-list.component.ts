import { Component, OnInit, inject } from '@angular/core';
import { MovieFacade } from '../../services/movie.facade';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { CarouselComponent } from '@shared/components/carousel/carousel.component';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { Observable } from 'rxjs';
import { Movie } from '../../types/movie.type';

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
  searchControl = new FormControl('');

  searchResults$: Observable<Movie[]> = this.facade.searchResults$;

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