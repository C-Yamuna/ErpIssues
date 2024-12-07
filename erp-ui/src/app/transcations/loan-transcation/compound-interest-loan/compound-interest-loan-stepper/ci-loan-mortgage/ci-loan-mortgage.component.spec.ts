import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiLoanMortgageComponent } from './ci-loan-mortgage.component';

describe('CiLoanMortgageComponent', () => {
  let component: CiLoanMortgageComponent;
  let fixture: ComponentFixture<CiLoanMortgageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CiLoanMortgageComponent]
    });
    fixture = TestBed.createComponent(CiLoanMortgageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
