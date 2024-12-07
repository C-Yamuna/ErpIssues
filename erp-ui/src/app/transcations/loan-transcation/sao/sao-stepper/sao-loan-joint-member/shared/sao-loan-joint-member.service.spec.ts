import { TestBed } from '@angular/core/testing';

import { SaoLoanJointMemberService } from './sao-loan-joint-member.service';

describe('SaoLoanJointMemberService', () => {
  let service: SaoLoanJointMemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaoLoanJointMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
