import { TestBed } from '@angular/core/testing';

import { RdAccountCommunicationService } from './rd-account-communication.service';

describe('RdAccountCommunicationService', () => {
  let service: RdAccountCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RdAccountCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
