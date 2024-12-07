import { TestBed } from '@angular/core/testing';

import { MembershipGroupDetailsService } from './membership-group-details.service';

describe('MembershipGroupDetailsService', () => {
  let service: MembershipGroupDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembershipGroupDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
