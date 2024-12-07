import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowingTransactionComponent } from './borrowing-transaction.component';

describe('BorrowingTransactionComponent', () => {
  let component: BorrowingTransactionComponent;
  let fixture: ComponentFixture<BorrowingTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorrowingTransactionComponent]
    });
    fixture = TestBed.createComponent(BorrowingTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
