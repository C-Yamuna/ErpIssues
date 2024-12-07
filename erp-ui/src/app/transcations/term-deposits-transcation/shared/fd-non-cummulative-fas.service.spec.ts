import { TestBed } from '@angular/core/testing';

import { FdNonCummulativeFasService } from './fd-non-cummulative-fas.service';

describe('FdNonCummulativeFasService', () => {
  let service: FdNonCummulativeFasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdNonCummulativeFasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
