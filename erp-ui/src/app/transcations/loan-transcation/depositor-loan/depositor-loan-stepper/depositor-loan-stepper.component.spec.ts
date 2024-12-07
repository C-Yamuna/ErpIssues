import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositorLoanStepperComponent } from './depositor-loan-stepper.component';

describe('DepositorLoanStepperComponent', () => {
  let component: DepositorLoanStepperComponent;
  let fixture: ComponentFixture<DepositorLoanStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepositorLoanStepperComponent]
    });
    fixture = TestBed.createComponent(DepositorLoanStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
