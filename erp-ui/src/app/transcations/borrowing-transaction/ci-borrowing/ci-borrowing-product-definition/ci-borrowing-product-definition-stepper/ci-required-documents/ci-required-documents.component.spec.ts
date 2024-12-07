import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiRequiredDocumentsComponent } from './ci-required-documents.component';

describe('CiRequiredDocumentsComponent', () => {
  let component: CiRequiredDocumentsComponent;
  let fixture: ComponentFixture<CiRequiredDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CiRequiredDocumentsComponent]
    });
    fixture = TestBed.createComponent(CiRequiredDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
