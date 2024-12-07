import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermLoanStepperComponent } from './term-loan-stepper.component';

describe('TermLoanStepperComponent', () => {
  let component: TermLoanStepperComponent;
  let fixture: ComponentFixture<TermLoanStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermLoanStepperComponent]
    });
    fixture = TestBed.createComponent(TermLoanStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
