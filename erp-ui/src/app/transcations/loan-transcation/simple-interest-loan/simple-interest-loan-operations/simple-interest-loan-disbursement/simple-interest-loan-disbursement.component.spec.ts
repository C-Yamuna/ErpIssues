import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleInterestLoanDisbursementComponent } from './simple-interest-loan-disbursement.component';

describe('SimpleInterestLoanDisbursementComponent', () => {
  let component: SimpleInterestLoanDisbursementComponent;
  let fixture: ComponentFixture<SimpleInterestLoanDisbursementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleInterestLoanDisbursementComponent]
    });
    fixture = TestBed.createComponent(SimpleInterestLoanDisbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
