import { TestBed } from '@angular/core/testing';

import { KycDocTypesService } from './kyc-doc-types.service';

describe('KycDocTypesService', () => {
  let service: KycDocTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KycDocTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
