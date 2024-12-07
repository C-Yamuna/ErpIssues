import { TestBed } from '@angular/core/testing';

import { RepaymentFrequencyService } from './repayment-frequency.service';

describe('RepaymentFrequencyService', () => {
  let service: RepaymentFrequencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepaymentFrequencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
