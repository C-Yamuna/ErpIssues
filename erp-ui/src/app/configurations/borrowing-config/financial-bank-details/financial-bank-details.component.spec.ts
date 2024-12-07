import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialBankDetailsComponent } from './financial-bank-details.component';

describe('FinancialBankDetailsComponent', () => {
  let component: FinancialBankDetailsComponent;
  let fixture: ComponentFixture<FinancialBankDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialBankDetailsComponent]
    });
    fixture = TestBed.createComponent(FinancialBankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
