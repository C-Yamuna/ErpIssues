import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoLoanDocumentsComponent } from './sao-loan-documents.component';

describe('SaoLoanDocumentsComponent', () => {
  let component: SaoLoanDocumentsComponent;
  let fixture: ComponentFixture<SaoLoanDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoLoanDocumentsComponent]
    });
    fixture = TestBed.createComponent(SaoLoanDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
