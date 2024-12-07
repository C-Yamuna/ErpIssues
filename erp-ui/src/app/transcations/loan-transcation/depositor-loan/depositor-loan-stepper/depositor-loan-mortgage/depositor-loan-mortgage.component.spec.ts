import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositorLoanMortgageComponent } from './depositor-loan-mortgage.component';

describe('DepositorLoanMortgageComponent', () => {
  let component: DepositorLoanMortgageComponent;
  let fixture: ComponentFixture<DepositorLoanMortgageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepositorLoanMortgageComponent]
    });
    fixture = TestBed.createComponent(DepositorLoanMortgageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
