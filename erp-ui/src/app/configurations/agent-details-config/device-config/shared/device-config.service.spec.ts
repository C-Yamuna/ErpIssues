import { TestBed } from '@angular/core/testing';

import { DeviceConfigService } from './device-config.service';

describe('DeviceConfigService', () => {
  let service: DeviceConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
