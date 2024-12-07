import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringDepositProductComponent } from './recurring-deposit-product.component';

describe('RecurringDepositProductComponent', () => {
  let component: RecurringDepositProductComponent;
  let fixture: ComponentFixture<RecurringDepositProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecurringDepositProductComponent]
    });
    fixture = TestBed.createComponent(RecurringDepositProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
