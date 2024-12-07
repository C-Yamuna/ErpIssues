import { TestBed } from '@angular/core/testing';

import { RdProductDefinitionService } from './rd-product-definition.service';

describe('RdProductDefinitionService', () => {
  let service: RdProductDefinitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RdProductDefinitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
