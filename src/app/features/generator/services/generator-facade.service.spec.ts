import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GeneratorFacadeService } from './generator-facade.service';

describe('GeneratorFacadeService', () => {
  let service: GeneratorFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GeneratorFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});