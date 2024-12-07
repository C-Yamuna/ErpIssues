import { TestBed } from '@angular/core/testing';

import { RdInterestPolicyConfigService } from './rd-interest-policy-config.service';

describe('RdInterestPolicyConfigService', () => {
  let service: RdInterestPolicyConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RdInterestPolicyConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
