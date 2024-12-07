import { TestBed } from '@angular/core/testing';

import { WorkFlowResourceService } from './work-flow-resource.service';

describe('WorkFlowResourceService', () => {
  let service: WorkFlowResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkFlowResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
