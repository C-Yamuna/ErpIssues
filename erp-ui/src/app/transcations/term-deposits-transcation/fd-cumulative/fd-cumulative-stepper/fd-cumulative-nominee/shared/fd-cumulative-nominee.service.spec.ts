import { TestBed } from '@angular/core/testing';

import { FdCumulativeNomineeService } from './fd-cumulative-nominee.service';

describe('FdCumulativeNomineeService', () => {
  let service: FdCumulativeNomineeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdCumulativeNomineeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
