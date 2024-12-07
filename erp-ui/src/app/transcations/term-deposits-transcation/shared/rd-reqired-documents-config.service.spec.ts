import { TestBed } from '@angular/core/testing';

import { RdReqiredDocumentsConfigService } from './rd-reqired-documents-config.service';

describe('RdReqiredDocumentsConfigService', () => {
  let service: RdReqiredDocumentsConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RdReqiredDocumentsConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
