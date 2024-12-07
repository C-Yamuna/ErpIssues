import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoBorrowingProductDefinitionStepperComponent } from './sao-borrowing-product-definition-stepper.component';

describe('SaoBorrowingProductDefinitionStepperComponent', () => {
  let component: SaoBorrowingProductDefinitionStepperComponent;
  let fixture: ComponentFixture<SaoBorrowingProductDefinitionStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoBorrowingProductDefinitionStepperComponent]
    });
    fixture = TestBed.createComponent(SaoBorrowingProductDefinitionStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
