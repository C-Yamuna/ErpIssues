import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiLoanDocumentsComponent } from './si-loan-documents.component';

describe('SiLoanDocumentsComponent', () => {
  let component: SiLoanDocumentsComponent;
  let fixture: ComponentFixture<SiLoanDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiLoanDocumentsComponent]
    });
    fixture = TestBed.createComponent(SiLoanDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
