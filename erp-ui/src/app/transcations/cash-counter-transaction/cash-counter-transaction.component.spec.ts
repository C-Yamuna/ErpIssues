import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashCounterTransactionComponent } from './cash-counter-transaction.component';

describe('CashCounterTransactionComponent', () => {
  let component: CashCounterTransactionComponent;
  let fixture: ComponentFixture<CashCounterTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CashCounterTransactionComponent]
    });
    fixture = TestBed.createComponent(CashCounterTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
