import { TestBed } from '@angular/core/testing';

import { InterestPaymentSummaryService } from './interest-payment-summary.service';

describe('InterestPaymentSummaryService', () => {
  let service: InterestPaymentSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterestPaymentSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
