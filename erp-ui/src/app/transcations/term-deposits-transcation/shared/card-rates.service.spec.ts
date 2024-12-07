import { TestBed } from '@angular/core/testing';

import { CardRatesService } from './card-rates.service';

describe('CardRatesService', () => {
  let service: CardRatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardRatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
