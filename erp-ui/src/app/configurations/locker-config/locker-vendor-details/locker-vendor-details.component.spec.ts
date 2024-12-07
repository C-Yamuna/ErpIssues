import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockerVendorDetailsComponent } from './locker-vendor-details.component';

describe('LockerVendorDetailsComponent', () => {
  let component: LockerVendorDetailsComponent;
  let fixture: ComponentFixture<LockerVendorDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LockerVendorDetailsComponent]
    });
    fixture = TestBed.createComponent(LockerVendorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
