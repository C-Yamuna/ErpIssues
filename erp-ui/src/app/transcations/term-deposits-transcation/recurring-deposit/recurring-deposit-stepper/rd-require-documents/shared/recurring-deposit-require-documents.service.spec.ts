import { TestBed } from '@angular/core/testing';

import { RecurringDepositRequireDocumentsService } from './recurring-deposit-require-documents.service';

describe('RecurringDepositRequireDocumentsService', () => {
  let service: RecurringDepositRequireDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecurringDepositRequireDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
