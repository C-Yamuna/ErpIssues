import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoRequiredDocumentsConfigComponent } from './sao-required-documents-config.component';

describe('SaoRequiredDocumentsConfigComponent', () => {
  let component: SaoRequiredDocumentsConfigComponent;
  let fixture: ComponentFixture<SaoRequiredDocumentsConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoRequiredDocumentsConfigComponent]
    });
    fixture = TestBed.createComponent(SaoRequiredDocumentsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
