import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLockerVendorDetailsComponent } from './add-locker-vendor-details.component';

describe('AddLockerVendorDetailsComponent', () => {
  let component: AddLockerVendorDetailsComponent;
  let fixture: ComponentFixture<AddLockerVendorDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLockerVendorDetailsComponent]
    });
    fixture = TestBed.createComponent(AddLockerVendorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
