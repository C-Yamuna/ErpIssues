import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeviceConfigComponent } from './add-device-config.component';

describe('AddDeviceConfigComponent', () => {
  let component: AddDeviceConfigComponent;
  let fixture: ComponentFixture<AddDeviceConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDeviceConfigComponent]
    });
    fixture = TestBed.createComponent(AddDeviceConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
