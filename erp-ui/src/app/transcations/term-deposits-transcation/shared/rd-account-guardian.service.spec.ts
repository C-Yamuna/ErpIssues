import { TestBed } from '@angular/core/testing';

import { RdAccountGuardianService } from './rd-account-guardian.service';

describe('RdAccountGuardianService', () => {
  let service: RdAccountGuardianService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RdAccountGuardianService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
