import { TestBed } from '@angular/core/testing';

import { SaoCommunicationService } from './sao-communication.service';

describe('SaoCommunicationService', () => {
  let service: SaoCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaoCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
