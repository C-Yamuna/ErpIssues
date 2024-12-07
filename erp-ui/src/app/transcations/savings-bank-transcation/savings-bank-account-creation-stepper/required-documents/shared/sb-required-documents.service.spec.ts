import { TestBed } from '@angular/core/testing';

import { SbRequiredDocumentsService } from './sb-required-documents.service';

describe('SbRequiredDocumentsService', () => {
  let service: SbRequiredDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SbRequiredDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
