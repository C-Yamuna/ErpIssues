import { TestBed } from '@angular/core/testing';

import { SubDistrictService } from './sub-district.service';

describe('SubDistrictService', () => {
  let service: SubDistrictService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubDistrictService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
