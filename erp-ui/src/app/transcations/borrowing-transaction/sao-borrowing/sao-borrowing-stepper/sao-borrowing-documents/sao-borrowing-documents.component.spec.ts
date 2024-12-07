import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoBorrowingDocumentsComponent } from './sao-borrowing-documents.component';

describe('SaoBorrowingDocumentsComponent', () => {
  let component: SaoBorrowingDocumentsComponent;
  let fixture: ComponentFixture<SaoBorrowingDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoBorrowingDocumentsComponent]
    });
    fixture = TestBed.createComponent(SaoBorrowingDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
