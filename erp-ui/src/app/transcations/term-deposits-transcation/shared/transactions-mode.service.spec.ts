import { TestBed } from '@angular/core/testing';

import { TransactionsModeService } from './transactions-mode.service';

describe('TransactionsModeService', () => {
  let service: TransactionsModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionsModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
