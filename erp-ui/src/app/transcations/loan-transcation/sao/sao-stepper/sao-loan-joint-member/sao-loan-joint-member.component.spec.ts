import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoLoanJointMemberComponent } from './sao-loan-joint-member.component';

describe('SaoLoanJointMemberComponent', () => {
  let component: SaoLoanJointMemberComponent;
  let fixture: ComponentFixture<SaoLoanJointMemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoLoanJointMemberComponent]
    });
    fixture = TestBed.createComponent(SaoLoanJointMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
