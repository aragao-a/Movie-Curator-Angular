import { Component, inject, ChangeDetectorRef, AfterViewInit, Input, ViewChild, ElementRef, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
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
      // Quando os itens mudam, resetamos e atualizamos a exibição
      this.currentFilters = null;
      this.updateDisplayedItems();
    }
  }

  ngAfterViewInit() {
    this.updateNavigation();
  }

  openFilterDialog() {
    this.filterDialog.open();
  }

  handleFilterApplied(filters: FilterValues) {
    let filteredItems = [...this.items];

    if (filters.name) {
      filteredItems = filteredItems.filter(item => 
        item.title?.toLowerCase().includes(filters.name!.toLowerCase())
      );
    }
    
    if (filters.genreId) {
      filteredItems = filteredItems.filter(item => 
        item.genre_ids?.includes(filters.genreId!)
      );
    }

    if (filters.year) {
      filteredItems = filteredItems.filter(item => 
        item.release_date?.startsWith(filters.year!.toString())
      );
    }
    
    this.currentFilters = filters;
    this.updateDisplayedItems();
  }

  clearFilter() {
    
    this.currentFilters = null;
    this.updateDisplayedItems();
    this.filterDialog.clear();
  }

  onSortChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.currentSortBy = selectElement.value as keyof CarouselItem;
    this.updateDisplayedItems();
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
    
    const key = this.currentSortBy;

    itemsToProcess.sort((a, b) => {

      if (key === 'vote') {
        return (b.vote ?? 0) - (a.vote ?? 0);
      }
      if (key === 'release_date') {
        const dateA = new Date(a.release_date ?? 0).getTime();
        const dateB = new Date(b.release_date ?? 0).getTime();
        return dateB - dateA;
      }
      if (key === 'title') {
        return (a.title ?? '').localeCompare(b.title ?? '');
      }

      return (b.popularity ?? 0) - (a.popularity ?? 0);
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

