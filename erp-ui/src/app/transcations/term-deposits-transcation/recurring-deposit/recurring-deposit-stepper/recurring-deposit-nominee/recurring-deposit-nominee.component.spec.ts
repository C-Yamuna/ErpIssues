import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringDepositNomineeComponent } from './recurring-deposit-nominee.component';

describe('RecurringDepositNomineeComponent', () => {
  let component: RecurringDepositNomineeComponent;
  let fixture: ComponentFixture<RecurringDepositNomineeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecurringDepositNomineeComponent]
    });
    fixture = TestBed.createComponent(RecurringDepositNomineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
