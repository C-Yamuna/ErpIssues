import { TestBed } from '@angular/core/testing';

import { RdAccountTransactionService } from './rd-account-transaction.service';

describe('RdAccountTransactionService', () => {
  let service: RdAccountTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RdAccountTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
