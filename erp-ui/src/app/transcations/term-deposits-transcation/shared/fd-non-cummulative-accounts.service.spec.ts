import { TestBed } from '@angular/core/testing';

import { FdNonCummulativeAccountsService } from './fd-non-cummulative-accounts.service';

describe('FdNonCummulativeAccountsService', () => {
  let service: FdNonCummulativeAccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdNonCummulativeAccountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
