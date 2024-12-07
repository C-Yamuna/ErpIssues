import { TestBed } from '@angular/core/testing';

import { MemInistitutionsService } from './mem-inistitutions.service';

describe('MemInistitutionsService', () => {
  let service: MemInistitutionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemInistitutionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
