import { TestBed } from '@angular/core/testing';

import { RdFasService } from './rd-fas.service';

describe('RdFasService', () => {
  let service: RdFasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RdFasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
