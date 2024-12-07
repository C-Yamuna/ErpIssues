import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiBorrowingStepperComponent } from './ci-borrowing-stepper.component';

describe('CiBorrowingStepperComponent', () => {
  let component: CiBorrowingStepperComponent;
  let fixture: ComponentFixture<CiBorrowingStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CiBorrowingStepperComponent]
    });
    fixture = TestBed.createComponent(CiBorrowingStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
