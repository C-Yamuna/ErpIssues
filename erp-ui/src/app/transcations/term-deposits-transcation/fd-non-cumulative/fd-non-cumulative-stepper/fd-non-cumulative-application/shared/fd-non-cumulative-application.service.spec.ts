import { TestBed } from '@angular/core/testing';

import { FdNonCumulativeApplicationService } from './fd-non-cumulative-application.service';

describe('FdNonCumulativeApplicationService', () => {
  let service: FdNonCumulativeApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdNonCumulativeApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
