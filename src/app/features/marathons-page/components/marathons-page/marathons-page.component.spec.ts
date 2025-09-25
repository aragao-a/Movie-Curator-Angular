import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarathonsPageComponent } from './marathons-page.component';

describe('MarathonsPageComponent', () => {
  let component: MarathonsPageComponent;
  let fixture: ComponentFixture<MarathonsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarathonsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarathonsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
