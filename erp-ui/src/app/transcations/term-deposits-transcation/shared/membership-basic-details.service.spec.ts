import { TestBed } from '@angular/core/testing';

import { MembershipBasicDetailsService } from './membership-basic-details.service';

describe('MembershipBasicDetailsService', () => {
  let service: MembershipBasicDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembershipBasicDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
