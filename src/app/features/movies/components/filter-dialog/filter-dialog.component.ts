import { Component, ChangeDetectionStrategy, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Genre } from '../../types/movie.type';
import { FormsModule } from '@angular/forms';
import { BaseDialogComponent } from '@shared/components/dialog/dialog.component';

export interface FilterValues {
  name: string | null;
  genreId: number | null;
  year: number | null;
}

@Component({
  selector: 'app-filter-dialog',
  standalone: true,
  imports: [CommonModule, BaseDialogComponent, FormsModule],
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterDialogComponent implements OnInit {
  @ViewChild(BaseDialogComponent) dialog!: BaseDialogComponent;

  @Input() genres: Genre[] = [];
  @Output() applyFilter = new EventEmitter<FilterValues>();

  years: number[] = [];
  
  selectedName: string | null = null;
  selectedGenreId: number | null = null;
  selectedYear: number | null = null;

  ngOnInit(): void {
    this.generateYearList();
  }

  private generateYearList(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1960; year--) {
      this.years.push(year);
    }
  }

  open() {
    this.dialog.open();
  }

  close() {
    this.dialog.close();
  }

  onApply() {
    const filters: FilterValues = {
      name: this.selectedName,
      genreId: this.selectedGenreId,
      year: this.selectedYear
    };
    this.applyFilter.emit(filters);
    this.close();
  }

  clear() {
    this.selectedName = null;
    this.selectedGenreId = null;
    this.selectedYear = null;
    this.onApply();
  }
}

