import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiLoanDocumentsComponent } from './ci-loan-documents.component';

describe('CiLoanDocumentsComponent', () => {
  let component: CiLoanDocumentsComponent;
  let fixture: ComponentFixture<CiLoanDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CiLoanDocumentsComponent]
    });
    fixture = TestBed.createComponent(CiLoanDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
