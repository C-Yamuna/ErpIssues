import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundInterestLoanStepperComponent } from './compound-interest-loan-stepper.component';

describe('CompoundInterestLoanStepperComponent', () => {
  let component: CompoundInterestLoanStepperComponent;
  let fixture: ComponentFixture<CompoundInterestLoanStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompoundInterestLoanStepperComponent]
    });
    fixture = TestBed.createComponent(CompoundInterestLoanStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
