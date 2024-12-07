import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipFeeTypesComponent } from './membership-fee-types.component';

describe('MembershipFeeTypesComponent', () => {
  let component: MembershipFeeTypesComponent;
  let fixture: ComponentFixture<MembershipFeeTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipFeeTypesComponent]
    });
    fixture = TestBed.createComponent(MembershipFeeTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
