import { TestBed } from '@angular/core/testing';

import { GeneralConfigService } from './general-config.service';

describe('GeneralConfigService', () => {
  let service: GeneralConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
