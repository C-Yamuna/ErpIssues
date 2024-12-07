import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipIrrigationTypesComponent } from './membership-irrigation-types.component';

describe('MembershipIrrigationTypesComponent', () => {
  let component: MembershipIrrigationTypesComponent;
  let fixture: ComponentFixture<MembershipIrrigationTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipIrrigationTypesComponent]
    });
    fixture = TestBed.createComponent(MembershipIrrigationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
