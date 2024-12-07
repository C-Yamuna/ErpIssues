import { TestBed } from '@angular/core/testing';

import { RdAccountNomineeService } from './rd-account-nominee.service';

describe('RdAccountNomineeService', () => {
  let service: RdAccountNomineeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RdAccountNomineeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
