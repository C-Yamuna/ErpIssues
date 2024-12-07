import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiBorrowingProductDefinitionStepperComponent } from './si-borrowing-product-definition-stepper.component';

describe('SiBorrowingProductDefinitionStepperComponent', () => {
  let component: SiBorrowingProductDefinitionStepperComponent;
  let fixture: ComponentFixture<SiBorrowingProductDefinitionStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiBorrowingProductDefinitionStepperComponent]
    });
    fixture = TestBed.createComponent(SiBorrowingProductDefinitionStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
