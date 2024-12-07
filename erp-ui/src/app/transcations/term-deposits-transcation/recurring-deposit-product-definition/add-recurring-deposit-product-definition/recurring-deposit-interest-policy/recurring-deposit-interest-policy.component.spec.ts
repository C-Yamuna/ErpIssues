import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringDepositInterestPolicyComponent } from './recurring-deposit-interest-policy.component';

describe('RecurringDepositInterestPolicyComponent', () => {
  let component: RecurringDepositInterestPolicyComponent;
  let fixture: ComponentFixture<RecurringDepositInterestPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecurringDepositInterestPolicyComponent]
    });
    fixture = TestBed.createComponent(RecurringDepositInterestPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
