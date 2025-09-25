import { Injectable, inject } from '@angular/core';
import { SavedMarathonStateService } from '../state/saved-marathon.state';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { SavedMarathon } from '../types/saved-marathon.type';
import { MarathonMovie } from '../../marathon/types/marathon.type';
import { map } from 'rxjs';

const MARATHONS_STORAGE_KEY = 'saved_marathons';

@Injectable({
  providedIn: 'root'
})
export class SavedMarathonFacade {
  private state = inject(SavedMarathonStateService);
  private storage = inject(LocalStorageService);

  savedMarathons$ = this.state.savedMarathonsState$.pipe(
    map(s => s.savedMarathons)
  );

  constructor() {
    this.loadMarathonsFromStorage();
  }

  saveMarathon(name: string, movies: MarathonMovie[], totalDuration: number) {
    const currentState = this.state.getState();
    const newMarathon: SavedMarathon = {
      id: Date.now(),
      name,
      movies,
      totalDuration
    };

    const updatedMarathons = [...currentState.savedMarathons, newMarathon];
    this.state.setState({ savedMarathons: updatedMarathons });
    this.storage.setItem(MARATHONS_STORAGE_KEY, updatedMarathons);
  }

  deleteMarathon(id: number) {
    const currentState = this.state.getState();
    const updatedMarathons = currentState.savedMarathons.filter(m => m.id !== id);
    this.state.setState({ savedMarathons: updatedMarathons });
    this.storage.setItem(MARATHONS_STORAGE_KEY, updatedMarathons);
  }

  private loadMarathonsFromStorage() {
    const marathons = this.storage.getItem<SavedMarathon[]>(MARATHONS_STORAGE_KEY);
    if (marathons) {
      this.state.setState({ savedMarathons: marathons });
    }
  }
}