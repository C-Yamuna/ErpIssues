import { TestBed } from '@angular/core/testing';

import { TransferTransactionsService } from './transfer-transactions.service';

describe('TransferTransactionsService', () => {
  let service: TransferTransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferTransactionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
