import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermLoanPurposeComponent } from './term-loan-purpose.component';

describe('TermLoanPurposeComponent', () => {
  let component: TermLoanPurposeComponent;
  let fixture: ComponentFixture<TermLoanPurposeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermLoanPurposeComponent]
    });
    fixture = TestBed.createComponent(TermLoanPurposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
