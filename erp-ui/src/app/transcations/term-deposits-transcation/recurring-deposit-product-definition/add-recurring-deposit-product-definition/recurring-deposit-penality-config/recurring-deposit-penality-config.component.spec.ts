import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringDepositPenalityConfigComponent } from './recurring-deposit-penality-config.component';

describe('RecurringDepositPenalityConfigComponent', () => {
  let component: RecurringDepositPenalityConfigComponent;
  let fixture: ComponentFixture<RecurringDepositPenalityConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecurringDepositPenalityConfigComponent]
    });
    fixture = TestBed.createComponent(RecurringDepositPenalityConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
