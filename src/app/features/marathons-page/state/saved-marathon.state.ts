import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SavedMarathon } from '../types/saved-marathon.type';

export interface SavedMarathonState {
  savedMarathons: SavedMarathon[];
}

const initialState: SavedMarathonState = {
  savedMarathons: [],
};

@Injectable({
  providedIn: 'root'
})
export class SavedMarathonStateService {
  private readonly state = new BehaviorSubject<SavedMarathonState>(initialState);
  readonly savedMarathonsState$ = this.state.asObservable();

  getState() {
    return this.state.getValue();
  }

  setState(newState: Partial<SavedMarathonState>) {
    this.state.next({ ...this.getState(), ...newState });
  }
}