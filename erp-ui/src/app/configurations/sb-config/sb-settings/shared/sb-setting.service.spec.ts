import { TestBed } from '@angular/core/testing';

import { SbSettingService } from './sb-setting.service';

describe('SbSettingService', () => {
  let service: SbSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SbSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
