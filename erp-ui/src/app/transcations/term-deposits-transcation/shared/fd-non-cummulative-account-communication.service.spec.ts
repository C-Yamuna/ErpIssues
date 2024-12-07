import { TestBed } from '@angular/core/testing';

import { FdNonCummulativeAccountCommunicationService } from './fd-non-cummulative-account-communication.service';

describe('FdNonCummulativeAccountCommunicationService', () => {
  let service: FdNonCummulativeAccountCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdNonCummulativeAccountCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
