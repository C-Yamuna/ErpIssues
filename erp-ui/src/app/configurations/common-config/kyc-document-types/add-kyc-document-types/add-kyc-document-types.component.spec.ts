import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKycDocumentTypesComponent } from './add-kyc-document-types.component';

describe('AddKycDocumentTypesComponent', () => {
  let component: AddKycDocumentTypesComponent;
  let fixture: ComponentFixture<AddKycDocumentTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddKycDocumentTypesComponent]
    });
    fixture = TestBed.createComponent(AddKycDocumentTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
