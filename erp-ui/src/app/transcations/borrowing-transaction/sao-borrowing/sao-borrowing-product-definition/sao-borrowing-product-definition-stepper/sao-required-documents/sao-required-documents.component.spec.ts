import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoRequiredDocumentsComponent } from './sao-required-documents.component';

describe('SaoRequiredDocumentsComponent', () => {
  let component: SaoRequiredDocumentsComponent;
  let fixture: ComponentFixture<SaoRequiredDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoRequiredDocumentsComponent]
    });
    fixture = TestBed.createComponent(SaoRequiredDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
