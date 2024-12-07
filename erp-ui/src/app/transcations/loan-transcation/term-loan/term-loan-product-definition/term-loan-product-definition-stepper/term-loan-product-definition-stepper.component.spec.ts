import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermLoanProductDefinitionStepperComponent } from './term-loan-product-definition-stepper.component';

describe('TermLoanProductDefinitionStepperComponent', () => {
  let component: TermLoanProductDefinitionStepperComponent;
  let fixture: ComponentFixture<TermLoanProductDefinitionStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermLoanProductDefinitionStepperComponent]
    });
    fixture = TestBed.createComponent(TermLoanProductDefinitionStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
