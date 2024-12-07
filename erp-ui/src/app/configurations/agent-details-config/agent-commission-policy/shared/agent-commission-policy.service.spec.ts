import { TestBed } from '@angular/core/testing';

import { AgentCommissionPolicyService } from './agent-commission-policy.service';

describe('AgentCommissionPolicyService', () => {
  let service: AgentCommissionPolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentCommissionPolicyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
