import { TestBed } from '@angular/core/testing';

import { FdCommulativeInterestPolicyConfigService } from './fd-commulative-interest-policy-config.service';

describe('FdCommulativeInterestPolicyConfigService', () => {
  let service: FdCommulativeInterestPolicyConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdCommulativeInterestPolicyConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
