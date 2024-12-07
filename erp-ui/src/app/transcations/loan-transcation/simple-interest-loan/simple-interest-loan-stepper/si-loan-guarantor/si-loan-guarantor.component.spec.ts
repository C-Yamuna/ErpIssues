import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiLoanGuarantorComponent } from './si-loan-guarantor.component';

describe('SiLoanGuarantorComponent', () => {
  let component: SiLoanGuarantorComponent;
  let fixture: ComponentFixture<SiLoanGuarantorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiLoanGuarantorComponent]
    });
    fixture = TestBed.createComponent(SiLoanGuarantorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
