import { TestBed } from '@angular/core/testing';

import { InterestPaymentFrequencyService } from './interest-payment-frequency.service';

describe('InterestPaymentFrequencyService', () => {
  let service: InterestPaymentFrequencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterestPaymentFrequencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
