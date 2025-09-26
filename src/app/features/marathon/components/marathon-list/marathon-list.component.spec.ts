import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MarathonListComponent } from './marathon-list.component';
import { MarathonFacadeService } from '../../services/marathon-facade.service';
import { SavedMarathonFacade } from 'src/app/features/marathons-page/services/saved-marathon.facade';
import { DurationPipe } from '@shared/pipes/duration.pipe';

describe('MarathonListComponent', () => {
  let component: MarathonListComponent;
  let fixture: ComponentFixture<MarathonListComponent>;
  
  let mockMarathonFacade: any;
  let mockSavedMarathonFacade: any;

  beforeEach(async () => {

    mockMarathonFacade = {
      marathonMovies$: of([]),
      totalDuration$: of(0),
      removeMovie: jasmine.createSpy('removeMovie'),
      clearCurrentMarathon: jasmine.createSpy('clearCurrentMarathon')
    };
    
    mockSavedMarathonFacade = {
      saveMarathon: jasmine.createSpy('saveMarathon')
    };

    await TestBed.configureTestingModule({
      imports: [MarathonListComponent, DurationPipe],
      providers: [
        { provide: MarathonFacadeService, useValue: mockMarathonFacade },
        { provide: SavedMarathonFacade, useValue: mockSavedMarathonFacade }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarathonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call facade.removeMovie with the correct id when removeMovie is called', () => {

    const testMovieId = 123;
    
    component.removeMovie(testMovieId);
    
    expect(mockMarathonFacade.removeMovie).toHaveBeenCalledWith(testMovieId);
  });
});