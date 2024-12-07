import { TestBed } from '@angular/core/testing';

import { AgentSecurityConfigService } from './agent-security-config.service';

describe('AgentSecurityConfigService', () => {
  let service: AgentSecurityConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentSecurityConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
