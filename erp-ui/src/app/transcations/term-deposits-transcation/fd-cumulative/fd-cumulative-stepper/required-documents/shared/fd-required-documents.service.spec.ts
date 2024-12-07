import { TestBed } from '@angular/core/testing';

import { FdRequiredDocumentsService } from './fd-required-documents.service';

describe('SbRequiredDocumentsService', () => {
  let service: FdRequiredDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdRequiredDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
