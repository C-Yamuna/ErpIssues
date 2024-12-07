import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiLoanGuarantorComponent } from './ci-loan-guarantor.component';

describe('CiLoanGuarantorComponent', () => {
  let component: CiLoanGuarantorComponent;
  let fixture: ComponentFixture<CiLoanGuarantorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CiLoanGuarantorComponent]
    });
    fixture = TestBed.createComponent(CiLoanGuarantorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
