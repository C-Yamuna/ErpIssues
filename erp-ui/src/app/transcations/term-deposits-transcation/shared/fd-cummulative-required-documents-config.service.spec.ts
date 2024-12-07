import { TestBed } from '@angular/core/testing';

import { FdCummulativeRequiredDocumentsConfigService } from './fd-cummulative-required-documents-config.service';

describe('FdCummulativeRequiredDocumentsConfigService', () => {
  let service: FdCummulativeRequiredDocumentsConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdCummulativeRequiredDocumentsConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
