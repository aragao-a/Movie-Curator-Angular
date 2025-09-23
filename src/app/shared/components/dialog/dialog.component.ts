import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-base-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseDialogComponent {
  @Input() cardTitle: string = '';
  @Output() closeDialog = new EventEmitter<void>();

  private cdr = inject(ChangeDetectorRef);

  isVisible = false;

  open() {
    this.isVisible = true;
    this.cdr.markForCheck();
  }

  close() {
    this.isVisible = false;
    this.closeDialog.emit();
    this.cdr.markForCheck();
  }

  onDialogClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
