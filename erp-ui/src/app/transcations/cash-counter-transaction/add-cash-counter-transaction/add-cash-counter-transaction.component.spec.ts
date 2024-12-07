import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCashCounterTransactionComponent } from './add-cash-counter-transaction.component';

describe('AddCashCounterTransactionComponent', () => {
  let component: AddCashCounterTransactionComponent;
  let fixture: ComponentFixture<AddCashCounterTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCashCounterTransactionComponent]
    });
    fixture = TestBed.createComponent(AddCashCounterTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
