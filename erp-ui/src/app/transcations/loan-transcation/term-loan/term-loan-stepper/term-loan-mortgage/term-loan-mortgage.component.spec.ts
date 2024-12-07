import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermLoanMortgageComponent } from './term-loan-mortgage.component';

describe('TermLoanMortgageComponent', () => {
  let component: TermLoanMortgageComponent;
  let fixture: ComponentFixture<TermLoanMortgageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermLoanMortgageComponent]
    });
    fixture = TestBed.createComponent(TermLoanMortgageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
