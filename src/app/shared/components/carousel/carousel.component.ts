import { Component, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Genre } from 'src/app/features/movies/types/movie.type';
import { FilterDialogComponent } from 'src/app/features/movies/components/filter-dialog/filter-dialog.component';

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
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FilterDialogComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent implements AfterViewInit {
  @Input() title!: string;
  @Input() items: CarouselItem[] = [];
  @Input() genres: Genre[] = [];
  @Input() isExplore = false;
  @Input() exploreLink = '';
  @Input() canNavigateLeft = false;
  @Input() canNavigateRight = false;
  @Input() isDefaultCarousel = true;
  @Input() isCastCarousel = false;

  @Output() prevSlideEvent = new EventEmitter<void>();
  @Output() nextSlideEvent = new EventEmitter<void>();
  @Output() filterApplied = new EventEmitter<number | null>();

  @ViewChild(FilterDialogComponent) filterDialog!: FilterDialogComponent;
  @ViewChild('carouselContainer', { static: false }) carouselContainer!: ElementRef;

  ngAfterViewInit() {
    this.updateNavigation();
  }

  openFilterDialog() {
    this.filterDialog.open();
  }

  handleFilterApplied(genreId: number | null) {
    this.filterApplied.emit(genreId);
  }

  prevSlide() {
    if (this.canNavigateLeft) {
      this.carouselContainer.nativeElement.scrollLeft -= 300;
      this.updateNavigation();
      this.prevSlideEvent.emit();
    }
  }

  nextSlide() {
    if (this.canNavigateRight) {
      this.carouselContainer.nativeElement.scrollLeft += 300;
      this.updateNavigation();
      this.nextSlideEvent.emit();
    }
  }

  private updateNavigation() {
    const container = this.carouselContainer.nativeElement;
    this.canNavigateLeft = container.scrollLeft > 0;
    this.canNavigateRight = container.scrollLeft < container.clientWidth + container.scrollLeft;
  }

  getPosterUrl(imgSrc: string): string {
    return `https://image.tmdb.org/t/p/w500${imgSrc}`;
  }
}
