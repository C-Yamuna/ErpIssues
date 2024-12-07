import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoLoanGuarantorComponent } from './sao-loan-guarantor.component';

describe('SaoLoanGuarantorComponent', () => {
  let component: SaoLoanGuarantorComponent;
  let fixture: ComponentFixture<SaoLoanGuarantorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoLoanGuarantorComponent]
    });
    fixture = TestBed.createComponent(SaoLoanGuarantorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
