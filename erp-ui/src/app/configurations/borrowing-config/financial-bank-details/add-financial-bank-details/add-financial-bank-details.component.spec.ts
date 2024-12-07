import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFinancialBankDetailsComponent } from './add-financial-bank-details.component';

describe('AddFinancialBankDetailsComponent', () => {
  let component: AddFinancialBankDetailsComponent;
  let fixture: ComponentFixture<AddFinancialBankDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFinancialBankDetailsComponent]
    });
    fixture = TestBed.createComponent(AddFinancialBankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
