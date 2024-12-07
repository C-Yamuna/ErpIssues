import { TestBed } from '@angular/core/testing';

import { ProductDefinitionService } from './product-definition.service';

describe('ProductDefinitionService', () => {
  let service: ProductDefinitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDefinitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
