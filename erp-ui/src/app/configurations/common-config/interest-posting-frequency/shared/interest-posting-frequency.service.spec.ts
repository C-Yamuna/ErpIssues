import { TestBed } from '@angular/core/testing';

import { InterestPostingFrequencyService } from './interest-posting-frequency.service';

describe('InterestPostingFrequencyService', () => {
  let service: InterestPostingFrequencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterestPostingFrequencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
