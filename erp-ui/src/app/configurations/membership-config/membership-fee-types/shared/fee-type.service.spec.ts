import { TestBed } from '@angular/core/testing';

import { FeeTypeService } from './fee-type.service';

describe('FeeTypeService', () => {
  let service: FeeTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeeTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
