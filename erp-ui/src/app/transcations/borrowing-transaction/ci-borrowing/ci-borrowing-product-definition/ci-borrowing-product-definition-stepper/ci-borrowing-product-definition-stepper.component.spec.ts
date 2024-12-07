import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiBorrowingProductDefinitionStepperComponent } from './ci-borrowing-product-definition-stepper.component';

describe('CiBorrowingProductDefinitionStepperComponent', () => {
  let component: CiBorrowingProductDefinitionStepperComponent;
  let fixture: ComponentFixture<CiBorrowingProductDefinitionStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CiBorrowingProductDefinitionStepperComponent]
    });
    fixture = TestBed.createComponent(CiBorrowingProductDefinitionStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
