import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringDepositCommunicationComponent } from './recurring-deposit-communication.component';

describe('RecurringDepositCommunicationComponent', () => {
  let component: RecurringDepositCommunicationComponent;
  let fixture: ComponentFixture<RecurringDepositCommunicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecurringDepositCommunicationComponent]
    });
    fixture = TestBed.createComponent(RecurringDepositCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
