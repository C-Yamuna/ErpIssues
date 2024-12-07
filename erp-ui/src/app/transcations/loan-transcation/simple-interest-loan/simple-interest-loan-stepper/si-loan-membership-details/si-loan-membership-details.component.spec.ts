import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiLoanMembershipDetailsComponent } from './si-loan-membership-details.component';

describe('SiLoanMembershipDetailsComponent', () => {
  let component: SiLoanMembershipDetailsComponent;
  let fixture: ComponentFixture<SiLoanMembershipDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiLoanMembershipDetailsComponent]
    });
    fixture = TestBed.createComponent(SiLoanMembershipDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
