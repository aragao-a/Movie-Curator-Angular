import { TestBed } from '@angular/core/testing';
import { of, BehaviorSubject } from 'rxjs';
import { MarathonFacadeService } from './marathon-facade.service';
import { MarathonStateService, MarathonState } from '../state/marathon-state.service';
import { MovieApiService } from '../../movies/api/movie.api';
import { CarouselItem } from '@shared/components/carousel/carousel.component';
import { MovieDetails } from '../../movies/types/movie.type';
import { MarathonMovie } from '../types/marathon.type';

describe('MarathonFacadeService', () => {
  let facade: MarathonFacadeService;
  let mockStateService: jasmine.SpyObj<MarathonStateService>;
  let mockMovieApiService: jasmine.SpyObj<MovieApiService>;

  const initialMovie: MarathonMovie = {
    id: 1, title: 'Initial Movie', runtime: 120, director: 'Director A', poster_path: '', overview: '', release_date: '', vote_average: 0, genre_ids: [], popularity: 0
  };

  beforeEach(() => {
    const stateServiceSpy = jasmine.createSpyObj(
      'MarathonStateService',
      ['getState', 'setState'],
      { marathon$: new BehaviorSubject<MarathonState>({ movies: [] }) }
    );
    const apiServiceSpy = jasmine.createSpyObj('MovieApiService', ['getMovieDetails']);

    TestBed.configureTestingModule({
      providers: [
        MarathonFacadeService,
        { provide: MarathonStateService, useValue: stateServiceSpy },
        { provide: MovieApiService, useValue: apiServiceSpy },
      ],
    });

    facade = TestBed.inject(MarathonFacadeService);
    mockStateService = TestBed.inject(MarathonStateService) as jasmine.SpyObj<MarathonStateService>;
    mockMovieApiService = TestBed.inject(MovieApiService) as jasmine.SpyObj<MovieApiService>;
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  describe('addMovie', () => {
    it('should add a new movie to the state if it does not exist', () => {
      const newMovie: CarouselItem = { id: 2, title: 'New Movie', link: '' };
      const movieDetails: MovieDetails = {
        id: 2, title: 'New Movie', runtime: 150, credits: { crew: [{ job: 'Director', name: 'Director B' }] }
      } as MovieDetails;

      mockStateService.getState.and.returnValue({ movies: [initialMovie] });
      mockMovieApiService.getMovieDetails.and.returnValue(of(movieDetails));
      
      facade.addMovie(newMovie);
      
      expect(mockMovieApiService.getMovieDetails).toHaveBeenCalledWith(2);
      expect(mockStateService.setState).toHaveBeenCalledTimes(1);
      
      const setStateCallArgs = mockStateService.setState.calls.mostRecent().args[0];
      expect(setStateCallArgs).toBeDefined();
      expect(setStateCallArgs.movies).toBeDefined();

      const updatedMovies = setStateCallArgs.movies!;

      expect(updatedMovies.length).toBe(2);
      expect(updatedMovies[1].id).toBe(2);
      expect(updatedMovies[1].runtime).toBe(150);
      expect(updatedMovies[1].director).toBe('Director B');
    });

    it('should not add a movie if it already exists', () => {
      const existingMovie: CarouselItem = { id: 1, title: 'Initial Movie', link: '' };
      const movieDetails: MovieDetails = { id: 1, title: 'Initial Movie', runtime: 120 } as MovieDetails;

      mockStateService.getState.and.returnValue({ movies: [initialMovie] });
      mockMovieApiService.getMovieDetails.and.returnValue(of(movieDetails));

      facade.addMovie(existingMovie);

      expect(mockStateService.setState).not.toHaveBeenCalled();
    });
  });

  it('should remove a movie when removeMovie is called', () => {
    mockStateService.getState.and.returnValue({ movies: [initialMovie, { id: 2 } as MarathonMovie] });
    
    facade.removeMovie(1);
    
    const expectedMovies = [{ id: 2 }];
    expect(mockStateService.setState).toHaveBeenCalledWith({ movies: expectedMovies as MarathonMovie[] });
  });

  it('should clear all movies when clearCurrentMarathon is called', () => {
    mockStateService.getState.and.returnValue({ movies: [initialMovie] });
    
    facade.clearCurrentMarathon();

    expect(mockStateService.setState).toHaveBeenCalledWith({ movies: [] });
  });
});