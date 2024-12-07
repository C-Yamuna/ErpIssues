import { TestBed } from '@angular/core/testing';

import { RdJointAccountHolderDetailsService } from './rd-joint-account-holder-details.service';

describe('RdJointAccountHolderDetailsService', () => {
  let service: RdJointAccountHolderDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RdJointAccountHolderDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
