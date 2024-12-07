import { TestBed } from '@angular/core/testing';

import { FdCumulativeApplicationService } from './fd-cumulative-application.service';

describe('FdNonCumulativeApplicationService', () => {
  let service: FdCumulativeApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdCumulativeApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
