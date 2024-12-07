import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionModeComponent } from './transaction-mode.component';

describe('TransactionModeComponent', () => {
  let component: TransactionModeComponent;
  let fixture: ComponentFixture<TransactionModeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionModeComponent]
    });
    fixture = TestBed.createComponent(TransactionModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
