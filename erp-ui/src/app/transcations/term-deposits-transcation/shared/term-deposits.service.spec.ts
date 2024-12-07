import { TestBed } from '@angular/core/testing';

import { TermDepositsService } from './term-deposits.service';

describe('TermDepositsService', () => {
  let service: TermDepositsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TermDepositsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
