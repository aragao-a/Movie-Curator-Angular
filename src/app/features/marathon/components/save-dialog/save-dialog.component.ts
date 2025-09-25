import { Component, EventEmitter, Output, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@shared/components/button/button.component';
import { BaseDialogComponent } from '@shared/components/dialog/dialog.component';

@Component({
  selector: 'app-save-dialog',
  standalone: true,
  imports: [CommonModule, ButtonComponent, BaseDialogComponent],
  templateUrl: './save-dialog.component.html',
  styleUrls: ['./save-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveDialogComponent {
  @ViewChild(BaseDialogComponent) dialog!: BaseDialogComponent;
  @ViewChild('marathonNameInput') nameInput!: ElementRef<HTMLInputElement>;
  
  @Output() save = new EventEmitter<string>();

  open() {
    if (this.nameInput) {
      this.nameInput.nativeElement.value = '';
    }
    this.dialog.open();
  }

  close() {
    this.dialog.close();
  }

  onSave() {
    const name = this.nameInput.nativeElement.value;
    if (name) {
      this.save.emit(name);
      this.close();
    }
  }
}