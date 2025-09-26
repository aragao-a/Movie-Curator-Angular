import { Component, ChangeDetectionStrategy, ViewChild, Output, EventEmitter, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselItem } from 'src/app/shared/components/carousel/carousel.component';
import { BaseDialogComponent } from '@shared/components/dialog/dialog.component';
import { MovieCardComponent } from 'src/app/features/movies/components/movie-card/movie-card.component';
import { Movie } from 'src/app/features/movies/types/movie.type';

@Component({
  selector: 'app-synopsis-dialog',
  standalone: true,
  imports: [
    CommonModule,
    BaseDialogComponent,
    MovieCardComponent,
  ],
  templateUrl: './synopsis-dialog.component.html',
  styleUrls: ['./synopsis-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SynopsisDialogComponent {
  @ViewChild(BaseDialogComponent) dialog!: BaseDialogComponent;
  @Output() addMovie = new EventEmitter<CarouselItem>();

  private cdr = inject(ChangeDetectorRef);
  
  movieForCard: Movie | null = null;
  private originalCarouselItem: CarouselItem | null = null;


  public show(item: CarouselItem): void {
    if (!item) {
      console.error('O método show() foi chamado sem um item de filme.');
      return;
    }

    this.originalCarouselItem = item;
    this.movieForCard = this.mapCarouselItemToMovie(item);

    this.cdr.detectChanges();

    this.dialog.open({ panelClass: 'synopsis-dialog-panel' });
  }

  close() {
    this.dialog.close();
  }

  onAddMovieFromCard(movie: Movie) {
    if (this.originalCarouselItem) {
      this.addMovie.emit(this.originalCarouselItem);
      this.close();
    }
  }

  private mapCarouselItemToMovie(item: CarouselItem): Movie {
    return {
      id: item.id,
      title: item.title || item.name || '',
      poster_path: item.imgSrc || '',
      overview: item.overview || '',
      release_date: item.release_date || '',
      vote_average: item.vote || 0,
      genre_ids: item.genre_ids || [],
      popularity: item.popularity || 0,
    };
  }
}