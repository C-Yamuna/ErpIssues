import { TestBed } from '@angular/core/testing';

import { InvestedBankDetailsService } from './invested-bank-details.service';

describe('InvestedBankDetailsService', () => {
  let service: InvestedBankDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestedBankDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
