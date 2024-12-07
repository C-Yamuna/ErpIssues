import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleInterestLoanStepperComponent } from './simple-interest-loan-stepper.component';

describe('SimpleInterestLoanStepperComponent', () => {
  let component: SimpleInterestLoanStepperComponent;
  let fixture: ComponentFixture<SimpleInterestLoanStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleInterestLoanStepperComponent]
    });
    fixture = TestBed.createComponent(SimpleInterestLoanStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
