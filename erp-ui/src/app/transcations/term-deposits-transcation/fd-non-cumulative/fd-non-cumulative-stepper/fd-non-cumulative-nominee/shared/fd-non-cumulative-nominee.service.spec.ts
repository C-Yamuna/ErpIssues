import { TestBed } from '@angular/core/testing';

import { FdNonCumulativeNomineeService } from './fd-non-cumulative-nominee.service';

describe('FdNonCumulativeNomineeService', () => {
  let service: FdNonCumulativeNomineeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdNonCumulativeNomineeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
