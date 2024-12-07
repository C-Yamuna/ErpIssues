import { TestBed } from '@angular/core/testing';

import { FdNonCumulativeJointHolderService } from './fd-non-cumulative-joint-holder.service';

describe('FdNonCumulativeJointHolderService', () => {
  let service: FdNonCumulativeJointHolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdNonCumulativeJointHolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
