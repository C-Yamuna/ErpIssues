import { TestBed } from '@angular/core/testing';

import { SoilTypesService } from './soil-types.service';

describe('SoilTypesService', () => {
  let service: SoilTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoilTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
