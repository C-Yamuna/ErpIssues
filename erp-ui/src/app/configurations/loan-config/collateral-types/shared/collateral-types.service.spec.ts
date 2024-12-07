import { TestBed } from '@angular/core/testing';

import { CollateralTypesService } from './collateral-types.service';

describe('CollateralTypesService', () => {
  let service: CollateralTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollateralTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
