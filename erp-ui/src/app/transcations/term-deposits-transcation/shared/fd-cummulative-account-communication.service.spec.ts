import { TestBed } from '@angular/core/testing';

import { FdCummulativeAccountCommunicationService } from './fd-cummulative-account-communication.service';

describe('FdCummulativeAccountCommunicationService', () => {
  let service: FdCummulativeAccountCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdCummulativeAccountCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
