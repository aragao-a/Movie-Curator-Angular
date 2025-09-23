import { Component, ChangeDetectionStrategy, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Genre } from '../../types/movie.type';
import { BaseDialogComponent } from '@shared/components/dialog/dialog.component';

@Component({
  selector: 'app-filter-dialog',
  standalone: true,
  imports: [CommonModule, BaseDialogComponent],
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterDialogComponent {
  @ViewChild(BaseDialogComponent) dialog!: BaseDialogComponent;

  @Input() genres: Genre[] = [];
  @Output() applyFilter = new EventEmitter<number | null>();

  selectedGenreId: number | null = null;

  open() {
    this.dialog.open();
  }

  close() {
    this.dialog.close();
  }

  onSelectGenre(genreId: number) {
    if (this.selectedGenreId === genreId) {
      this.selectedGenreId = null;
    } else {
      this.selectedGenreId = genreId;
    }
  }

  onApply() {
    this.applyFilter.emit(this.selectedGenreId);
    this.close();
  }
}
