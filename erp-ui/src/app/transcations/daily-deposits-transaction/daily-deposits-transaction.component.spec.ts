import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyDepositsTransactionComponent } from './daily-deposits-transaction.component';

describe('DailyDepositsTransactionComponent', () => {
  let component: DailyDepositsTransactionComponent;
  let fixture: ComponentFixture<DailyDepositsTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyDepositsTransactionComponent]
    });
    fixture = TestBed.createComponent(DailyDepositsTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
