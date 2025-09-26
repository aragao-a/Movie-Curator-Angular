import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let buttonElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    buttonElement = fixture.nativeElement.querySelector('button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have "btn-primary" class by default', () => {
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('btn-primary');
  });

  it('should apply "btn-secondary" class when appearance is secondary', () => {
    component.appearance = 'secondary';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('btn-secondary');
    expect(buttonElement.classList).not.toContain('btn-primary');
  });

  it('should apply "btn-tertiary" class when appearance is tertiary', () => {
    component.appearance = 'tertiary';
    fixture.detectChanges();
    expect(buttonElement.classList).toContain('btn-tertiary');
  });
});