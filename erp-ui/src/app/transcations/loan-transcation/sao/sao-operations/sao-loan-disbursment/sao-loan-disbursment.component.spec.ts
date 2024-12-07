import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoLoanDisbursmentComponent } from './sao-loan-disbursment.component';

describe('SaoLoanDisbursmentComponent', () => {
  let component: SaoLoanDisbursmentComponent;
  let fixture: ComponentFixture<SaoLoanDisbursmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoLoanDisbursmentComponent]
    });
    fixture = TestBed.createComponent(SaoLoanDisbursmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
