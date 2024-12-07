import { TestBed } from '@angular/core/testing';

import { AgentMappingService } from './agent-mapping.service';

describe('AgentMappingService', () => {
  let service: AgentMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
