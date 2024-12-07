import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermLoansLoanGuarantorComponent } from './term-loans-loan-guarantor.component';

describe('TermLoansLoanGuarantorComponent', () => {
  let component: TermLoansLoanGuarantorComponent;
  let fixture: ComponentFixture<TermLoansLoanGuarantorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermLoansLoanGuarantorComponent]
    });
    fixture = TestBed.createComponent(TermLoansLoanGuarantorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
