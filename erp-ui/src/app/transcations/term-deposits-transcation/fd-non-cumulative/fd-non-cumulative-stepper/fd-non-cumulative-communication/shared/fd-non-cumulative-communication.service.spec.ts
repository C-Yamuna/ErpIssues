import { TestBed } from '@angular/core/testing';

import { FdNonCumulativeCommunicationService } from './fd-non-cumulative-communication.service';

describe('FdNonCumulativeCommunicationService', () => {
  let service: FdNonCumulativeCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdNonCumulativeCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
