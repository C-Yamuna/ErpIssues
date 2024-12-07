import { TestBed } from '@angular/core/testing';

import { FdCummulativeJointAccHolderDetailsService } from './fd-cummulative-joint-acc-holder-details.service';

describe('FdCummulativeJointAccHolderDetailsService', () => {
  let service: FdCummulativeJointAccHolderDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdCummulativeJointAccHolderDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
