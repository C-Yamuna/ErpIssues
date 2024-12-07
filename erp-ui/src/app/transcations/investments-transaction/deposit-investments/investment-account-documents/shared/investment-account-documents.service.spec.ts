import { TestBed } from '@angular/core/testing';

import { InvestmentAccountDocumentsService } from './investment-account-documents.service';

describe('InvestmentAccountDocumentsService', () => {
  let service: InvestmentAccountDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentAccountDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
