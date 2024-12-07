import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermLoanInterestPolicyComponent } from './term-loan-interest-policy.component';

describe('TermLoanInterestPolicyComponent', () => {
  let component: TermLoanInterestPolicyComponent;
  let fixture: ComponentFixture<TermLoanInterestPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermLoanInterestPolicyComponent]
    });
    fixture = TestBed.createComponent(TermLoanInterestPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
