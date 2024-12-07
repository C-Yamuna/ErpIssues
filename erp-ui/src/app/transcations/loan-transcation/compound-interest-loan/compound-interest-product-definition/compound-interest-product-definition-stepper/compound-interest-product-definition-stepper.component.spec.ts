import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundInterestProductDefinitionStepperComponent } from './compound-interest-product-definition-stepper.component';

describe('CompoundInterestProductDefinitionStepperComponent', () => {
  let component: CompoundInterestProductDefinitionStepperComponent;
  let fixture: ComponentFixture<CompoundInterestProductDefinitionStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompoundInterestProductDefinitionStepperComponent]
    });
    fixture = TestBed.createComponent(CompoundInterestProductDefinitionStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
