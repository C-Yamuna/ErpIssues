import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermRequiredDocumentsComponent } from './term-required-documents.component';

describe('TermRequiredDocumentsComponent', () => {
  let component: TermRequiredDocumentsComponent;
  let fixture: ComponentFixture<TermRequiredDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermRequiredDocumentsComponent]
    });
    fixture = TestBed.createComponent(TermRequiredDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
