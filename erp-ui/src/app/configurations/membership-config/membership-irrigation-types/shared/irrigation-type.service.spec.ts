import { TestBed } from '@angular/core/testing';

import { IrrigationTypeService } from './irrigation-type.service';

describe('IrrigationTypeService', () => {
  let service: IrrigationTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IrrigationTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
