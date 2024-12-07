import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiRequiredDocumentsComponent } from './si-required-documents.component';

describe('SiRequiredDocumentsComponent', () => {
  let component: SiRequiredDocumentsComponent;
  let fixture: ComponentFixture<SiRequiredDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiRequiredDocumentsComponent]
    });
    fixture = TestBed.createComponent(SiRequiredDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
