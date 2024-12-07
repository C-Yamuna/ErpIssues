import { TestBed } from '@angular/core/testing';

import { FdCummulativeAccountNomineesService } from './fd-cummulative-account-nominees.service';

describe('FdCummulativeAccountNomineesService', () => {
  let service: FdCummulativeAccountNomineesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdCummulativeAccountNomineesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
