import { TestBed } from '@angular/core/testing';

import { SavingsBankNomineeService } from './savings-bank-nominee.service';

describe('SavingsBankNomineeService', () => {
  let service: SavingsBankNomineeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavingsBankNomineeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
