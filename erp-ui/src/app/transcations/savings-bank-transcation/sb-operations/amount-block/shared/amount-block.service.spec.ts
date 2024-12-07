import { TestBed } from '@angular/core/testing';

import { AmountBlockService } from './amount-block.service';

describe('AmountBlockService', () => {
  let service: AmountBlockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmountBlockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
