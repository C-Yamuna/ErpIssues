import { TestBed } from '@angular/core/testing';

import { SavingsBankCommunicationService } from './savings-bank-communication.service';

describe('SavingsBankCommunicationService', () => {
  let service: SavingsBankCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavingsBankCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
