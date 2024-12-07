import { TestBed } from '@angular/core/testing';

import { FdCummulativeAccountsTransactionsService } from './fd-cummulative-accounts-transactions.service';

describe('FdCummulativeAccountsTransactionsService', () => {
  let service: FdCummulativeAccountsTransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdCummulativeAccountsTransactionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
