import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositorLoanDocumentsComponent } from './depositor-loan-documents.component';

describe('DepositorLoanDocumentsComponent', () => {
  let component: DepositorLoanDocumentsComponent;
  let fixture: ComponentFixture<DepositorLoanDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepositorLoanDocumentsComponent]
    });
    fixture = TestBed.createComponent(DepositorLoanDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
