import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipAddIrrigationTypesComponent } from './membership-add-irrigation-types.component';

describe('MembershipAddIrrigationTypesComponent', () => {
  let component: MembershipAddIrrigationTypesComponent;
  let fixture: ComponentFixture<MembershipAddIrrigationTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipAddIrrigationTypesComponent]
    });
    fixture = TestBed.createComponent(MembershipAddIrrigationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
