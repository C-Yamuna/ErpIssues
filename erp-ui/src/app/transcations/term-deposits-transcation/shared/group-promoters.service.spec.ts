import { TestBed } from '@angular/core/testing';

import { GroupPromotersService } from './group-promoters.service';

describe('GroupPromotersService', () => {
  let service: GroupPromotersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupPromotersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
