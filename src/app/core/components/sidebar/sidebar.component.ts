import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarathonListComponent } from 'src/app/features/marathon/components/marathon-list/marathon-list.component';
import { MovieFacade } from 'src/app/features/movies/services/movie.facade';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, MarathonListComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  private movieFacade = inject(MovieFacade);

  resetMovieSearchState(): void {
    this.movieFacade.clearSearchResults();
  }
  title = 'CineLog';
}