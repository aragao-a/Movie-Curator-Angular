import { Component, Output, EventEmitter, inject, ChangeDetectorRef, AfterViewInit, Input, ViewChild, ElementRef, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Genre } from 'src/app/features/movies/types/movie.type';
import { FilterDialogComponent, FilterValues } from 'src/app/features/movies/components/filter-dialog/filter-dialog.component';
import { ButtonComponent } from '../button/button.component';

export interface CarouselItem {
  id: number;
  title?: string;
  name?: string;
  imgSrc?: string;
  link: string;
  rating?: number;
  vote?: number;
  character?: string;
  genres?: string;
  genre_ids?: number[];
  release_date?: string;
  popularity?: number;
  runtime?: number;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FilterDialogComponent,
    ButtonComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent implements AfterViewInit, OnChanges {
  @Input() title!: string;
  @Input() items: CarouselItem[] = [];
  @Input() genres: Genre[] = [];
  @Input() canSortByRuntime = false;

  @Output() addMovie = new EventEmitter<CarouselItem>();
  @Output() sortByRuntimeRequested = new EventEmitter<void>();

  @Input() canNavigateLeft = true;
  @Input() canNavigateRight = true;
  @Input() isDefaultCarousel = true;
  @Input() isCastCarousel = false;
  
  @ViewChild(FilterDialogComponent) filterDialog!: FilterDialogComponent;
  @ViewChild('carouselContainer') carouselContainer!: ElementRef<HTMLElement>;

  private cdr = inject(ChangeDetectorRef);

  displayedItems: CarouselItem[] = [];
  isFiltered = false;
  private currentSortBy: keyof CarouselItem = 'popularity';
  private currentFilters: FilterValues | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.updateDisplayedItems();
    }
  }

  ngAfterViewInit() {
    this.updateNavigation();
  }

  openFilterDialog() {
    this.filterDialog.open();
  }

  onAddMovieToMarathon(item: CarouselItem, event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.addMovie.emit(item);
  }

  handleFilterApplied(filters: FilterValues) {
    this.currentFilters = filters;
    this.updateDisplayedItems();
  }

  clearFilter(fromButton = true) {
    this.currentFilters = null;
    if(fromButton) {
      this.filterDialog.clear();
    }
    this.updateDisplayedItems();
  }

  onSortChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value as keyof CarouselItem;

    this.currentSortBy = value;

    if (value === 'runtime') {
      this.sortByRuntimeRequested.emit();
    } else {
      this.updateDisplayedItems();
    }
  }

  private updateDisplayedItems() {
    let itemsToProcess = [...this.items];

    if (this.currentFilters) {
      const filters = this.currentFilters;
      if (filters.name) {
        itemsToProcess = itemsToProcess.filter(item => 
          item.title?.toLowerCase().includes(filters.name!.toLowerCase())
        );
      }
      if (filters.genreId) {
        itemsToProcess = itemsToProcess.filter(item => 
          item.genre_ids?.includes(filters.genreId!)
        );
      }
      if (filters.year) {
        itemsToProcess = itemsToProcess.filter(item => 
          item.release_date?.startsWith(filters.year!.toString())
        );
      }
    }
    
    itemsToProcess.sort((a, b) => {
      switch (this.currentSortBy) {
        case 'runtime':
          return (b.runtime ?? -1) - (a.runtime ?? -1);
        case 'vote':
          return (b.vote ?? 0) - (a.vote ?? 0);
        case 'release_date':
          return new Date(b.release_date ?? 0).getTime() - new Date(a.release_date ?? 0).getTime();
        case 'title':
          return (a.title ?? '').localeCompare(b.title ?? '');
        case 'popularity':
        default:
          return (b.popularity ?? 0) - (a.popularity ?? 0);
      }
    });

    this.displayedItems = itemsToProcess;
    this.isFiltered = !!this.currentFilters && (!!this.currentFilters.name || !!this.currentFilters.genreId || !!this.currentFilters.year);
    this.cdr.markForCheck();
  }

  prevSlide() {
    if (this.carouselContainer) {
      this.carouselContainer.nativeElement.scrollLeft -= 300;
    }
  }

  nextSlide() {
    if (this.carouselContainer) {
      this.carouselContainer.nativeElement.scrollLeft += 300;
    }
  }
  
  updateNavigation() {}

  getPosterUrl(imgSrc: string | undefined): string {
    return imgSrc ? `https://image.tmdb.org/t/p/w500${imgSrc}` : '';
  }
}