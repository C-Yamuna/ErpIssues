import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermBorrowingStepperComponent } from './term-borrowing-stepper.component';

describe('TermBorrowingStepperComponent', () => {
  let component: TermBorrowingStepperComponent;
  let fixture: ComponentFixture<TermBorrowingStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermBorrowingStepperComponent]
    });
    fixture = TestBed.createComponent(TermBorrowingStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
