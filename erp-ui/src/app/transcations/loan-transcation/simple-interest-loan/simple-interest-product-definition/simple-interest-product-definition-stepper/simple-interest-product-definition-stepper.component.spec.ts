import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleInterestProductDefinitionStepperComponent } from './simple-interest-product-definition-stepper.component';

describe('SimpleInterestProductDefinitionStepperComponent', () => {
  let component: SimpleInterestProductDefinitionStepperComponent;
  let fixture: ComponentFixture<SimpleInterestProductDefinitionStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleInterestProductDefinitionStepperComponent]
    });
    fixture = TestBed.createComponent(SimpleInterestProductDefinitionStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
