import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiLoanNewMembershipComponent } from './si-loan-new-membership.component';

describe('SiLoanNewMembershipComponent', () => {
  let component: SiLoanNewMembershipComponent;
  let fixture: ComponentFixture<SiLoanNewMembershipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiLoanNewMembershipComponent]
    });
    fixture = TestBed.createComponent(SiLoanNewMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
