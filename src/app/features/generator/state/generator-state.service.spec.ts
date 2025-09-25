import { TestBed } from '@angular/core/testing';

import { GeneratorStateService } from './generator-state.service';

describe('GeneratorStateService', () => {
  let service: GeneratorStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneratorStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
