import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringDepositNewMemberComponent } from './recurring-deposit-new-member.component';

describe('RecurringDepositNewMemberComponent', () => {
  let component: RecurringDepositNewMemberComponent;
  let fixture: ComponentFixture<RecurringDepositNewMemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecurringDepositNewMemberComponent]
    });
    fixture = TestBed.createComponent(RecurringDepositNewMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
