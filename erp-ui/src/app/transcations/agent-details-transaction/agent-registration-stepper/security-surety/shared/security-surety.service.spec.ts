import { TestBed } from '@angular/core/testing';

import { SecuritySuretyService } from './security-surety.service';

describe('SecuritySuretyService', () => {
  let service: SecuritySuretyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecuritySuretyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
