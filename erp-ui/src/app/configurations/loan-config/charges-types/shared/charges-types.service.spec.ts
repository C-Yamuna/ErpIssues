import { TestBed } from '@angular/core/testing';

import { ChargesTypesService } from './charges-types.service';

describe('ChargesTypesService', () => {
  let service: ChargesTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChargesTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
