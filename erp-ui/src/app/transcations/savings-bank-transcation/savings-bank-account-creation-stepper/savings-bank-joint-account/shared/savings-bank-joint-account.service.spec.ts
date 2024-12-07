import { TestBed } from '@angular/core/testing';

import { SavingsBankJointAccountService } from './savings-bank-joint-account.service';

describe('SavingsBankJointAccountService', () => {
  let service: SavingsBankJointAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavingsBankJointAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
