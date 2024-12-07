import { TestBed } from '@angular/core/testing';

import { TermAccountInstallmentsService } from './term-account-installments.service';

describe('TermAccountInstallmentsService', () => {
  let service: TermAccountInstallmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TermAccountInstallmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
