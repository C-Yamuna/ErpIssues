import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdRequireDocumentsComponent } from './rd-require-documents.component';

describe('RdRequireDocumentsComponent', () => {
  let component: RdRequireDocumentsComponent;
  let fixture: ComponentFixture<RdRequireDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RdRequireDocumentsComponent]
    });
    fixture = TestBed.createComponent(RdRequireDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
