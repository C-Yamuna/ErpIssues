import { TestBed } from '@angular/core/testing';

import { TdCashTransactionDenominationService } from './td-cash-transaction-denomination.service';

describe('TdCashTransactionDenominationService', () => {
  let service: TdCashTransactionDenominationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TdCashTransactionDenominationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
