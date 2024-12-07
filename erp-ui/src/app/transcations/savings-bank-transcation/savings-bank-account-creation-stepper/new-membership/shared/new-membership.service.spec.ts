import { TestBed } from '@angular/core/testing';

import { NewMembershipService } from './new-membership.service';

describe('NewMembershipService', () => {
  let service: NewMembershipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewMembershipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
