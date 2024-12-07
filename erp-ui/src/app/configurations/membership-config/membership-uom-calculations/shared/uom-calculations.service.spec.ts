import { TestBed } from '@angular/core/testing';

import { UomCalculationsService } from './uom-calculations.service';

describe('UomCalculationsService', () => {
  let service: UomCalculationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UomCalculationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
