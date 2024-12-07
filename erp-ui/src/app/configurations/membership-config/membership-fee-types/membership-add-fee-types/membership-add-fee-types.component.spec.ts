import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipAddFeeTypesComponent } from './membership-add-fee-types.component';

describe('MembershipAddFeeTypesComponent', () => {
  let component: MembershipAddFeeTypesComponent;
  let fixture: ComponentFixture<MembershipAddFeeTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipAddFeeTypesComponent]
    });
    fixture = TestBed.createComponent(MembershipAddFeeTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
