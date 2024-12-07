import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoProductDefinitionStepperComponent } from './sao-product-definition-stepper.component';

describe('SaoProductDefinitionStepperComponent', () => {
  let component: SaoProductDefinitionStepperComponent;
  let fixture: ComponentFixture<SaoProductDefinitionStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoProductDefinitionStepperComponent]
    });
    fixture = TestBed.createComponent(SaoProductDefinitionStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
