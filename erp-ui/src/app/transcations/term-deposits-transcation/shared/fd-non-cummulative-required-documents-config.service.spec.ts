import { TestBed } from '@angular/core/testing';

import { FdNonCummulativeRequiredDocumentsConfigService } from './fd-non-cummulative-required-documents-config.service';

describe('FdNonCummulativeRequiredDocumentsConfigService', () => {
  let service: FdNonCummulativeRequiredDocumentsConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdNonCummulativeRequiredDocumentsConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
