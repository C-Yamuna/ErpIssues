import { TestBed } from '@angular/core/testing';

import { SavingsBankStepperService } from './savings-bank-stepper.service';

describe('SavingsBankStepperService', () => {
  let service: SavingsBankStepperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavingsBankStepperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
