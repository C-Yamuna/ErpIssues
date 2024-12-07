import { TestBed } from '@angular/core/testing';

import { FdCummulativeAccountsService } from './fd-cummulative-accounts.service';

describe('FdCummulativeAccountsService', () => {
  let service: FdCummulativeAccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdCummulativeAccountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
