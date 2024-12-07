import { TestBed } from '@angular/core/testing';

import { SavingBankApplicationService } from './saving-bank-application.service';

describe('SavingBankApplicationService', () => {
  let service: SavingBankApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavingBankApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
