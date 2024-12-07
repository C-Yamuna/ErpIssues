import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringDepositKycComponent } from './recurring-deposit-kyc.component';

describe('RecurringDepositKycComponent', () => {
  let component: RecurringDepositKycComponent;
  let fixture: ComponentFixture<RecurringDepositKycComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecurringDepositKycComponent]
    });
    fixture = TestBed.createComponent(RecurringDepositKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
