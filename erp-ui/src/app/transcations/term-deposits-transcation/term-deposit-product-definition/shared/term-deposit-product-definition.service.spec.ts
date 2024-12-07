import { TestBed } from '@angular/core/testing';

import { TermDepositProductDefinitionService } from './term-deposit-product-definition.service';

describe('TermDepositProductDefinitionService', () => {
  let service: TermDepositProductDefinitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TermDepositProductDefinitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
