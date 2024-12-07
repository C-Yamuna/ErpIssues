import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiLoanMortgageComponent } from './si-loan-mortgage.component';

describe('SiLoanMortgageComponent', () => {
  let component: SiLoanMortgageComponent;
  let fixture: ComponentFixture<SiLoanMortgageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiLoanMortgageComponent]
    });
    fixture = TestBed.createComponent(SiLoanMortgageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
