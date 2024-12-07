import { TestBed } from '@angular/core/testing';

import { LoanAccountTypeService } from './loan-account-type.service';

describe('LoanAccountTypeService', () => {
  let service: LoanAccountTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanAccountTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
