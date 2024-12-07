import { TestBed } from '@angular/core/testing';

import { RdAccountKycService } from './rd-account-kyc.service';

describe('RdAccountKycService', () => {
  let service: RdAccountKycService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RdAccountKycService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
