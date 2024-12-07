import { TestBed } from '@angular/core/testing';

import { FdNonCummulativeJointAccHolderDetailsService } from './fd-non-cummulative-joint-acc-holder-details.service';

describe('FdNonCummulativeJointAccHolderDetailsService', () => {
  let service: FdNonCummulativeJointAccHolderDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdNonCummulativeJointAccHolderDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
