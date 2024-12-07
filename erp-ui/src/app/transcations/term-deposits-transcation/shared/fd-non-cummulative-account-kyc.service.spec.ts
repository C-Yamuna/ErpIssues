import { TestBed } from '@angular/core/testing';

import { FdNonCummulativeAccountKycService } from './fd-non-cummulative-account-kyc.service';

describe('FdNonCummulativeAccountKycService', () => {
  let service: FdNonCummulativeAccountKycService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdNonCummulativeAccountKycService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
