import { TestBed } from '@angular/core/testing';

import { FdNonCumulativeKycService } from './fd-non-cumulative-kyc.service';

describe('FdNonCumulativeKycService', () => {
  let service: FdNonCumulativeKycService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdNonCumulativeKycService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
