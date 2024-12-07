import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermBorrowingProductDefinitionStepperComponent } from './term-borrowing-product-definition-stepper.component';

describe('TermBorrowingProductDefinitionStepperComponent', () => {
  let component: TermBorrowingProductDefinitionStepperComponent;
  let fixture: ComponentFixture<TermBorrowingProductDefinitionStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermBorrowingProductDefinitionStepperComponent]
    });
    fixture = TestBed.createComponent(TermBorrowingProductDefinitionStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
