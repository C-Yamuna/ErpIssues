import { TestBed } from '@angular/core/testing';

import { FdNonCummulativeAccountNomineesService } from './fd-non-cummulative-account-nominees.service';

describe('FdNonCummulativeAccountNomineesService', () => {
  let service: FdNonCummulativeAccountNomineesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdNonCummulativeAccountNomineesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
