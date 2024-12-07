import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermLoanDocumentsComponent } from './term-loan-documents.component';

describe('TermLoanDocumentsComponent', () => {
  let component: TermLoanDocumentsComponent;
  let fixture: ComponentFixture<TermLoanDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermLoanDocumentsComponent]
    });
    fixture = TestBed.createComponent(TermLoanDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
