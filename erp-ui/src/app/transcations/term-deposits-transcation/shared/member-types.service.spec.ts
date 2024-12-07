import { TestBed } from '@angular/core/testing';

import { MemberTypesService } from './member-types.service';

describe('MemberTypesService', () => {
  let service: MemberTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
