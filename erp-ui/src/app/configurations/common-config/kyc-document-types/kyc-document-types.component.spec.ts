import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycDocumentTypesComponent } from './kyc-document-types.component';

describe('KycDocumentTypesComponent', () => {
  let component: KycDocumentTypesComponent;
  let fixture: ComponentFixture<KycDocumentTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KycDocumentTypesComponent]
    });
    fixture = TestBed.createComponent(KycDocumentTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
