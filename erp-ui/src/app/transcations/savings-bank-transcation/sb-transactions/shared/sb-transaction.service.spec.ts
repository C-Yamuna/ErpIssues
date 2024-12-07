import { TestBed } from '@angular/core/testing';
import { SbTransactionService } from './sb-transaction.service';

describe('SbTransactionService', () => {
  let service: SbTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SbTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
