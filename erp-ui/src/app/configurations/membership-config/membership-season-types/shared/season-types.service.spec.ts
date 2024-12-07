import { TestBed } from '@angular/core/testing';

import { SeasonTypesService } from './season-types.service';

describe('SeasonTypesService', () => {
  let service: SeasonTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeasonTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
