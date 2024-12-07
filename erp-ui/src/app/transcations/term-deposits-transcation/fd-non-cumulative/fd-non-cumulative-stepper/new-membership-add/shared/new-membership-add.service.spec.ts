import { TestBed } from '@angular/core/testing';

import { NewMembershipAddService } from './new-membership-add.service';

describe('NewMembershipAddService', () => {
  let service: NewMembershipAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewMembershipAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
