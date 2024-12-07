import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermBorrowingDocumentComponent } from './term-borrowing-document.component';

describe('TermBorrowingDocumentComponent', () => {
  let component: TermBorrowingDocumentComponent;
  let fixture: ComponentFixture<TermBorrowingDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermBorrowingDocumentComponent]
    });
    fixture = TestBed.createComponent(TermBorrowingDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
