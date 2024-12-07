import { TestBed } from '@angular/core/testing';

import { DailyDepositsProductDefinitionService } from './daily-deposits-product-definition.service';

describe('DailyDepositsProductDefinitionService', () => {
  let service: DailyDepositsProductDefinitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyDepositsProductDefinitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
