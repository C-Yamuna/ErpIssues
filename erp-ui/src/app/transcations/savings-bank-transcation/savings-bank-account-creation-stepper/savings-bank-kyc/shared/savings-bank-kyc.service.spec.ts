import { TestBed } from '@angular/core/testing';

import { SavingsBankKycService } from './savings-bank-kyc.service';

describe('SavingsBankKycService', () => {
  let service: SavingsBankKycService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavingsBankKycService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
