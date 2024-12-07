import { TestBed } from '@angular/core/testing';

import { TermDepositFormTypesService } from './term-deposit-form-types.service';

describe('TermDepositFormTypesService', () => {
  let service: TermDepositFormTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TermDepositFormTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
