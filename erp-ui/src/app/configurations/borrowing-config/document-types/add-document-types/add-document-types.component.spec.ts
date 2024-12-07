import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocumentTypesComponent } from './add-document-types.component';

describe('AddDocumentTypesComponent', () => {
  let component: AddDocumentTypesComponent;
  let fixture: ComponentFixture<AddDocumentTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDocumentTypesComponent]
    });
    fixture = TestBed.createComponent(AddDocumentTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
