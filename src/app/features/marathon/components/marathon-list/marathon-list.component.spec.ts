import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarathonListComponent } from './marathon-list.component';

describe('MarathonListComponent', () => {
  let component: MarathonListComponent;
  let fixture: ComponentFixture<MarathonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarathonListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarathonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
