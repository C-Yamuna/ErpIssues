import { TestBed } from '@angular/core/testing';

import { FdNonCummulativeAccountsTransactionsService } from './fd-non-cummulative-accounts-transactions.service';

describe('FdNonCummulativeAccountsTransactionsService', () => {
  let service: FdNonCummulativeAccountsTransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdNonCummulativeAccountsTransactionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
