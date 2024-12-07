import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdNonCumulativePreviewComponent } from './fd-non-cumulative-preview.component';

describe('FdNonCumulativePreviewComponent', () => {
  let component: FdNonCumulativePreviewComponent;
  let fixture: ComponentFixture<FdNonCumulativePreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FdNonCumulativePreviewComponent]
    });
    fixture = TestBed.createComponent(FdNonCumulativePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
