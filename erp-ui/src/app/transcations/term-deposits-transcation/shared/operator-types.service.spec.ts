import { TestBed } from '@angular/core/testing';

import { OperatorTypesService } from './operator-types.service';

describe('OperatorTypesService', () => {
  let service: OperatorTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperatorTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
