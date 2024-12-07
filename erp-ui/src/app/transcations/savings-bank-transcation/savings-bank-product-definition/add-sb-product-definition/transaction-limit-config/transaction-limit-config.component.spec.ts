import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionLimitConfigComponent } from './transaction-limit-config.component';

describe('TransactionLimitConfigComponent', () => {
  let component: TransactionLimitConfigComponent;
  let fixture: ComponentFixture<TransactionLimitConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionLimitConfigComponent]
    });
    fixture = TestBed.createComponent(TransactionLimitConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
