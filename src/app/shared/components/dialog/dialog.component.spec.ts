import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseDialogComponent } from './dialog.component';

describe('BaseDialogComponent', () => {
  let component: BaseDialogComponent;
  let fixture: ComponentFixture<BaseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invisible by default', () => {
    expect(component.isVisible).toBeFalse();
  });

  it('should become visible when open() is called', () => {
    component.open();
    expect(component.isVisible).toBeTrue();
  });

  it('should become invisible when close() is called', () => {
    component.open();
    component.close();
    expect(component.isVisible).toBeFalse();
  });

  it('should apply a custom panelClass when provided via open()', () => {
    const customClass = 'my-custom-dialog';
    component.open({ panelClass: customClass });
    fixture.detectChanges();
    
    const dialogElement = fixture.nativeElement.querySelector('.dialog-card');
    expect(dialogElement.classList).toContain(customClass);
  });
});