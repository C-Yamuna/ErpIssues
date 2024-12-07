import { TestBed } from '@angular/core/testing';

import { PenalityConfigService } from './penality-config.service';

describe('PenalityConfigService', () => {
  let service: PenalityConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PenalityConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
