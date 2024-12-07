import { TestBed } from '@angular/core/testing';

import { DebitCardTypesService } from './debit-card-types.service';

describe('DebitCardTypesService', () => {
  let service: DebitCardTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DebitCardTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
