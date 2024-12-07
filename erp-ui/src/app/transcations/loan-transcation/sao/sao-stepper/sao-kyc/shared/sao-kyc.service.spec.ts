import { TestBed } from '@angular/core/testing';

import { SaoKycService } from './sao-kyc.service';

describe('SaoKycService', () => {
  let service: SaoKycService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaoKycService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
