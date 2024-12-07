import { TestBed } from '@angular/core/testing';

import { TransactionModesService } from './transaction-modes.service';

describe('TransactionModesService', () => {
  let service: TransactionModesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionModesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
