import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdNonCumulativeRequiredDocumentsComponent } from './fd-non-cumulative-required-documents.component';

describe('FdNonCumulativeRequiredDocumentsComponent', () => {
  let component: FdNonCumulativeRequiredDocumentsComponent;
  let fixture: ComponentFixture<FdNonCumulativeRequiredDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FdNonCumulativeRequiredDocumentsComponent]
    });
    fixture = TestBed.createComponent(FdNonCumulativeRequiredDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
