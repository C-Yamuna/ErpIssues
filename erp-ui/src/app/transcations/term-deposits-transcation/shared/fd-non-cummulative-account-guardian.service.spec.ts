import { TestBed } from '@angular/core/testing';

import { FdNonCummulativeAccountGuardianService } from './fd-non-cummulative-account-guardian.service';

describe('FdNonCummulativeAccountGuardianService', () => {
  let service: FdNonCummulativeAccountGuardianService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdNonCummulativeAccountGuardianService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
