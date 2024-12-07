import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyDepositStepperComponent } from './daily-deposit-stepper.component';

describe('DailyDepositStepperComponent', () => {
  let component: DailyDepositStepperComponent;
  let fixture: ComponentFixture<DailyDepositStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyDepositStepperComponent]
    });
    fixture = TestBed.createComponent(DailyDepositStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
