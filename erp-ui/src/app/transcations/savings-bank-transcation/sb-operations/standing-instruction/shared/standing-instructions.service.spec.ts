import { TestBed } from '@angular/core/testing';

import { StandingInstructionsService } from './standing-instructions.service';

describe('StandingInstructionsService', () => {
  let service: StandingInstructionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandingInstructionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
