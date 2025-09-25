import { TestBed } from '@angular/core/testing';

import { MarathonFacadeService } from './marathon-facade.service';

describe('MarathonFacadeService', () => {
  let service: MarathonFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarathonFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
