import { TestBed } from '@angular/core/testing';

import { SharesInvestmentsService } from './shares-investments.service';

describe('SharesInvestmentsService', () => {
  let service: SharesInvestmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharesInvestmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
