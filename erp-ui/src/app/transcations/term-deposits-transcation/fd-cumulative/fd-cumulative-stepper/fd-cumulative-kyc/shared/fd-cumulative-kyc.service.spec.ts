import { TestBed } from '@angular/core/testing';

import { FdCumulativeKycService } from './fd-cumulative-kyc.service';

describe('FdCumulativeKycService', () => {
  let service: FdCumulativeKycService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdCumulativeKycService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
