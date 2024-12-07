import { TestBed } from '@angular/core/testing';

import { FdNonCummulativeInterestPolicyConfigService } from './fd-non-cummulative-interest-policy-config.service';

describe('FdNonCummulativeInterestPolicyConfigService', () => {
  let service: FdNonCummulativeInterestPolicyConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdNonCummulativeInterestPolicyConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
