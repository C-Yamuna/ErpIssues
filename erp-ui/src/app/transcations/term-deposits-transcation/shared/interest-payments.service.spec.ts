import { TestBed } from '@angular/core/testing';

import { InterestPaymentsService } from './interest-payments.service';

describe('InterestPaymentsService', () => {
  let service: InterestPaymentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterestPaymentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
