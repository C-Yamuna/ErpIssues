import { TestBed } from '@angular/core/testing';

import { ScaleOfFinanceConfigsService } from './scale-of-finance-configs.service';

describe('ScaleOfFinanceConfigsService', () => {
  let service: ScaleOfFinanceConfigsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScaleOfFinanceConfigsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
