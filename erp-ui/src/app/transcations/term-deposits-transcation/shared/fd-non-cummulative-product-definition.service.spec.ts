import { TestBed } from '@angular/core/testing';

import { FdNonCummulativeProductDefinitionService } from './fd-non-cummulative-product-definition.service';

describe('FdNonCummulativeProductDefinitionService', () => {
  let service: FdNonCummulativeProductDefinitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdNonCummulativeProductDefinitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
