import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiBorrowingDocumentsComponent } from './ci-borrowing-documents.component';

describe('CiBorrowingDocumentsComponent', () => {
  let component: CiBorrowingDocumentsComponent;
  let fixture: ComponentFixture<CiBorrowingDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CiBorrowingDocumentsComponent]
    });
    fixture = TestBed.createComponent(CiBorrowingDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
