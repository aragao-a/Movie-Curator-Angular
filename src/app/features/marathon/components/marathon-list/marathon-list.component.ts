import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarathonFacadeService } from '../../services/marathon-facade.service';
import { Observable } from 'rxjs';
import { MarathonMovie } from '../../types/marathon.type';
import { DurationPipe } from '@shared/pipes/duration.pipe';
import { ButtonComponent } from '@shared/components/button/button.component';
import { SavedMarathonFacade } from 'src/app/features/marathons-page/services/saved-marathon.facade';
import { take } from 'rxjs/operators';
import { SaveDialogComponent } from '../save-dialog/save-dialog.component';

@Component({
  selector: 'app-marathon-list',
  standalone: true,
  imports: [CommonModule, DurationPipe, ButtonComponent, SaveDialogComponent],
  templateUrl: './marathon-list.component.html',
  styleUrls: ['./marathon-list.component.scss']
})
export class MarathonListComponent {
  private facade = inject(MarathonFacadeService);
  private savedMarathonFacade = inject(SavedMarathonFacade);

  @ViewChild('saveDialog') saveDialog!: SaveDialogComponent;

  movies$: Observable<MarathonMovie[]> = this.facade.marathonMovies$;
  totalDuration$: Observable<number> = this.facade.totalDuration$;

  removeMovie(movieId: number) {
    this.facade.removeMovie(movieId);
  }

  handleSaveMarathon(name: string) {
    if (!name) return;

    this.movies$.pipe(take(1)).subscribe(movies => {
      this.totalDuration$.pipe(take(1)).subscribe(duration => {
        this.savedMarathonFacade.saveMarathon(name, movies, duration);
        this.facade.clearCurrentMarathon();
      });
    });
  }
}