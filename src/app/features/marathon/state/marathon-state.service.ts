import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MarathonMovie } from '../types/marathon.type';

export interface MarathonState {
  movies: MarathonMovie[];
}

const initialState: MarathonState = {
  movies: [],
};

@Injectable({
  providedIn: 'root'
})
export class MarathonStateService {
  private readonly state = new BehaviorSubject<MarathonState>(initialState);
  readonly marathon$ = this.state.asObservable();

  getState() {
    return this.state.getValue();
  }

  setState(newState: Partial<MarathonState>) {
    this.state.next({ ...this.getState(), ...newState });
  }
}