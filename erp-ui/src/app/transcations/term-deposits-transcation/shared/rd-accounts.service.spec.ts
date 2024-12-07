import { TestBed } from '@angular/core/testing';

import { RdAccountsService } from './rd-accounts.service';

describe('RdAccountsService', () => {
  let service: RdAccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RdAccountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
