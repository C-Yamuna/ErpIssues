import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbRequiredDocumentsComponent } from './fd-required-documents.component';

describe('SbRequiredDocumentsComponent', () => {
  let component: SbRequiredDocumentsComponent;
  let fixture: ComponentFixture<SbRequiredDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SbRequiredDocumentsComponent]
    });
    fixture = TestBed.createComponent(SbRequiredDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
