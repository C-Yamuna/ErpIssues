import { TestBed } from '@angular/core/testing';

import { IncorporationTypesService } from './incorporation-types.service';

describe('IncorporationTypesService', () => {
  let service: IncorporationTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncorporationTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
