import { TestBed } from '@angular/core/testing';

import { FdCumulativeCommunicationService } from './fd-cumulative-communication.service';

describe('FdCumulativeCommunicationService', () => {
  let service: FdCumulativeCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdCumulativeCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
