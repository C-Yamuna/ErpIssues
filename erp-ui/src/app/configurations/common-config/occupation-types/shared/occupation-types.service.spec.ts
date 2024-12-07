import { TestBed } from '@angular/core/testing';

import { OccupationTypesService } from './occupation-types.service';

describe('OccupationTypesService', () => {
  let service: OccupationTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OccupationTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
