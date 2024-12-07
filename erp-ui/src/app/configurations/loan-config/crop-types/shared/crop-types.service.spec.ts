import { TestBed } from '@angular/core/testing';

import { CropTypesService } from './crop-types.service';

describe('CropTypesService', () => {
  let service: CropTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CropTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
