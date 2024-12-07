import { TestBed } from '@angular/core/testing';

import { AgentDetailsTransactionService } from './agent-details-transaction.service';

describe('AgentDetailsTransactionService', () => {
  let service: AgentDetailsTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentDetailsTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
