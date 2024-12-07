import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermLoanRequiredDocumentsComponent } from './term-loan-required-documents.component';

describe('TermLoanRequiredDocumentsComponent', () => {
  let component: TermLoanRequiredDocumentsComponent;
  let fixture: ComponentFixture<TermLoanRequiredDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermLoanRequiredDocumentsComponent]
    });
    fixture = TestBed.createComponent(TermLoanRequiredDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
