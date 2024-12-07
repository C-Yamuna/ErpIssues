import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoBorrowingStepperComponent } from './sao-borrowing-stepper.component';

describe('SaoBorrowingStepperComponent', () => {
  let component: SaoBorrowingStepperComponent;
  let fixture: ComponentFixture<SaoBorrowingStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoBorrowingStepperComponent]
    });
    fixture = TestBed.createComponent(SaoBorrowingStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
