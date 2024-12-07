import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermLoanChargesComponent } from './term-loan-charges.component';

describe('TermLoanChargesComponent', () => {
  let component: TermLoanChargesComponent;
  let fixture: ComponentFixture<TermLoanChargesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermLoanChargesComponent]
    });
    fixture = TestBed.createComponent(TermLoanChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
