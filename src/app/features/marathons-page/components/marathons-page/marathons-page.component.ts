import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SavedMarathonFacade } from '../../services/saved-marathon.facade';
import { CarouselComponent, CarouselItem } from 'src/app/shared/components/carousel/carousel.component';
import { SavedMarathon } from '../../types/saved-marathon.type';
import { DurationPipe } from "../../../../shared/pipes/duration.pipe";
import { ButtonComponent } from "../../../../shared/components/button/button.component";

@Component({
    selector: 'app-marathons-page',
    standalone: true,
    templateUrl: './marathons-page.component.html',
    styleUrls: ['./marathons-page.component.scss'],
    imports: [CommonModule, CarouselComponent, DurationPipe, ButtonComponent]
})
export class MarathonsPageComponent {
  private savedMarathonFacade = inject(SavedMarathonFacade);
  savedMarathons$ = this.savedMarathonFacade.savedMarathons$;

  mapMoviesToCarouselItems(marathon: SavedMarathon): CarouselItem[] {
    return marathon.movies.map(movie => ({
      id: movie.id,
      title: movie.title,
      imgSrc: movie.poster_path,
      link: `/movie/${movie.id}`,
      rating: movie.vote_average * 10,
      vote: movie.vote_average,
      genres: '',
      genre_ids: movie.genre_ids,
      release_date: movie.release_date,
      popularity: movie.popularity,
      runtime: movie.runtime
    }));
  }

  deleteMarathon(id: number) {
    this.savedMarathonFacade.deleteMarathon(id);
  }
}