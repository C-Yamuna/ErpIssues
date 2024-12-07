import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTypesComponent } from './document-types.component';

describe('DocumentTypesComponent', () => {
  let component: DocumentTypesComponent;
  let fixture: ComponentFixture<DocumentTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentTypesComponent]
    });
    fixture = TestBed.createComponent(DocumentTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
