import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiBorrowingDocumentComponent } from './si-borrowing-document.component';

describe('SiBorrowingDocumentComponent', () => {
  let component: SiBorrowingDocumentComponent;
  let fixture: ComponentFixture<SiBorrowingDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiBorrowingDocumentComponent]
    });
    fixture = TestBed.createComponent(SiBorrowingDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
