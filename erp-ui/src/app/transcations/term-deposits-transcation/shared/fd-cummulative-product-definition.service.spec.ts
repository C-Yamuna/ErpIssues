import { TestBed } from '@angular/core/testing';

import { FdCummulativeProductDefinitionService } from './fd-cummulative-product-definition.service';

describe('FdCummulativeProductDefinitionService', () => {
  let service: FdCummulativeProductDefinitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FdCummulativeProductDefinitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
