import { TestBed } from '@angular/core/testing';

import { SocietyBranchService } from './society-branch.service';

describe('SocietyBranchService', () => {
  let service: SocietyBranchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocietyBranchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
