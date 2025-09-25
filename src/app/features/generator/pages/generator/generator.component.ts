import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GeneratorFacadeService } from '../../services/generator-facade.service';
import { CarouselComponent, CarouselItem } from 'src/app/shared/components/carousel/carousel.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { MovieFacade } from 'src/app/features/movies/services/movie.facade';
import { MarathonFacadeService } from 'src/app/features/marathon/services/marathon-facade.service';

@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CarouselComponent,
    ButtonComponent,
  ],
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {

  private readonly facade = inject(GeneratorFacadeService);
  private readonly movieFacade = inject(MovieFacade);
  private readonly marathonFacade = inject(MarathonFacadeService);

  searchControl = new FormControl('');

  filmography$ = this.facade.filmography$;
  loading$ = this.facade.loading$;
  selectedPersonName$ = this.facade.selectedPersonName$;

  ngOnInit(): void {
    this.movieFacade.loadGenres();
  }

  onSearch(): void {
    if (this.searchControl.value) {
      this.facade.searchPersonAndGetFilmography(this.searchControl.value);
    }
  }

  handleAddMovie(movie: CarouselItem) {
    this.marathonFacade.addMovie(movie);
  }
}