import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Person } from '../types/generator.type';
import { Movie } from '../../movies/types/movie.type';

export interface GeneratorState {
  searchResults: Person[];
  filmography: Movie[];
  selectedPerson: Person | null;
  loading: boolean;
  error: string | null;
}

const initialState: GeneratorState = {
  searchResults: [],
  filmography: [],
  selectedPerson: null,
  loading: false,
  error: null,
};

@Injectable({
  providedIn: 'root'
})
export class GeneratorStateService {
  private readonly state = new BehaviorSubject<GeneratorState>(initialState);

  readonly generatorState$ = this.state.asObservable();

  getState(): GeneratorState {
    return this.state.getValue();
  }

  setState(newState: Partial<GeneratorState>): void {
    this.state.next({ ...this.getState(), ...newState });
  }

  setLoading(loading: boolean): void {
    this.setState({ loading });
  }

  setError(error: string | null): void {
    this.setState({ error });
  }
}