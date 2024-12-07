import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentsInterestPaymentComponent } from './investments-interest-payment.component';

describe('InvestmentsInterestPaymentComponent', () => {
  let component: InvestmentsInterestPaymentComponent;
  let fixture: ComponentFixture<InvestmentsInterestPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestmentsInterestPaymentComponent]
    });
    fixture = TestBed.createComponent(InvestmentsInterestPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
