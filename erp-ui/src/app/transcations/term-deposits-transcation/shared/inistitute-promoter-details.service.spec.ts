import { TestBed } from '@angular/core/testing';

import { InistitutePromoterDetailsService } from './inistitute-promoter-details.service';

describe('InterestPromoterDetailsService', () => {
  let service: InistitutePromoterDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InistitutePromoterDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
