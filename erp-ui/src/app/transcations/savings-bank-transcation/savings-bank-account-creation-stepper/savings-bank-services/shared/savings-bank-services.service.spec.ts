import { TestBed } from '@angular/core/testing';

import { SavingsBankServicesService } from './savings-bank-services.service';

describe('SavingsBankServicesService', () => {
  let service: SavingsBankServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavingsBankServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
