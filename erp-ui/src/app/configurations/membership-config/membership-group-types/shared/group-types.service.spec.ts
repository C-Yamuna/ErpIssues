import { TestBed } from '@angular/core/testing';

import { GroupTypesService } from './group-types.service';

describe('GroupTypesService', () => {
  let service: GroupTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
