import { TestBed } from '@angular/core/testing';

import { FdCummulativeFasService } from './fd-cummulative-fas.service';

describe('FdCummulativeFasService', () => {
  let service: FdCummulativeFasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdCummulativeFasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
