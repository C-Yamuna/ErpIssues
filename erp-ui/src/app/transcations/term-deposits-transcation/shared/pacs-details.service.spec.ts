import { TestBed } from '@angular/core/testing';

import { PacsDetailsService } from './pacs-details.service';

describe('PacsDetailsService', () => {
  let service: PacsDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacsDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
