import { TestBed } from '@angular/core/testing';

import { RdPenaltyConfigService } from './rd-penalty-config.service';

describe('RdPenaltyConfigService', () => {
  let service: RdPenaltyConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RdPenaltyConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
