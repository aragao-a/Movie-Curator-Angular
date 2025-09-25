import { TestBed } from '@angular/core/testing';

import { MarathonStateService } from './marathon-state.service';

describe('MarathonStateService', () => {
  let service: MarathonStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarathonStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
