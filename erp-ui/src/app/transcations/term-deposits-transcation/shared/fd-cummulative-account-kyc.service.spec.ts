import { TestBed } from '@angular/core/testing';

import { FdCummulativeAccountKycService } from './fd-cummulative-account-kyc.service';

describe('FdCummulativeAccountKycService', () => {
  let service: FdCummulativeAccountKycService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdCummulativeAccountKycService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
