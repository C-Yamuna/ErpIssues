import { TestBed } from '@angular/core/testing';

import { McrDetailsService } from './mcr-details.service';

describe('McrDetailsService', () => {
  let service: McrDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(McrDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
