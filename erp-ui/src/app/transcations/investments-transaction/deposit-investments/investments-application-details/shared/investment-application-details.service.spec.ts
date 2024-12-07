import { TestBed } from '@angular/core/testing';

import { InvestmentApplicationDetailsService } from './investment-application-details.service';

describe('InvestmentApplicationDetailsService', () => {
  let service: InvestmentApplicationDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentApplicationDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
