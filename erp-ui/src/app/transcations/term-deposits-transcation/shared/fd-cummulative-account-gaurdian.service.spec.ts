import { TestBed } from '@angular/core/testing';

import { FdCummulativeAccountGaurdianService } from './fd-cummulative-account-gaurdian.service';

describe('FdCummulativeAccountGaurdianService', () => {
  let service: FdCummulativeAccountGaurdianService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdCummulativeAccountGaurdianService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
