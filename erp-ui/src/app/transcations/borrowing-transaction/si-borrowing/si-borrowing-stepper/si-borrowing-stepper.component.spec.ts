import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiBorrowingStepperComponent } from './si-borrowing-stepper.component';

describe('SiBorrowingStepperComponent', () => {
  let component: SiBorrowingStepperComponent;
  let fixture: ComponentFixture<SiBorrowingStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiBorrowingStepperComponent]
    });
    fixture = TestBed.createComponent(SiBorrowingStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
