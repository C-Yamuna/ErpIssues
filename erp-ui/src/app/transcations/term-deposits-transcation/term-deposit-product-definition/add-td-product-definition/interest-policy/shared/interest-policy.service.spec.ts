import { TestBed } from '@angular/core/testing';

import { InterestPolicyService } from './interest-policy.service';

describe('InterestPolicyService', () => {
  let service: InterestPolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterestPolicyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
