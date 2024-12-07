import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringDepositStepperComponent } from './recurring-deposit-stepper.component';

describe('RecurringDepositStepperComponent', () => {
  let component: RecurringDepositStepperComponent;
  let fixture: ComponentFixture<RecurringDepositStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecurringDepositStepperComponent]
    });
    fixture = TestBed.createComponent(RecurringDepositStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
