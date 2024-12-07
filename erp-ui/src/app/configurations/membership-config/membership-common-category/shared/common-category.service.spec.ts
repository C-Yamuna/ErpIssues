import { TestBed } from '@angular/core/testing';

import { CommonCategoryService } from './common-category.service';

describe('CommonCategoryService', () => {
  let service: CommonCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
