import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringDepositJointHolderDetailsComponent } from './recurring-deposit-joint-holder-details.component';

describe('RecurringDepositJointHolderDetailsComponent', () => {
  let component: RecurringDepositJointHolderDetailsComponent;
  let fixture: ComponentFixture<RecurringDepositJointHolderDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecurringDepositJointHolderDetailsComponent]
    });
    fixture = TestBed.createComponent(RecurringDepositJointHolderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
