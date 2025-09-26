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
  @Input() size: 'default' | 'small' = 'default';
  @Output() closeDialog = new EventEmitter<void>();

  private cdr = inject(ChangeDetectorRef);

  isVisible = false;
  panelClass = '';

  public open(config?: { panelClass: string }): void {
    if (config?.panelClass) {
      this.panelClass = config.panelClass;
    }
    this.isVisible = true;
    this.cdr.markForCheck();
  }

  public close(): void {
    this.isVisible = false;
    this.panelClass = ''; 
    this.closeDialog.emit();
    this.cdr.markForCheck();
  }

  onDialogClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}