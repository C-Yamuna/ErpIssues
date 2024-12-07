import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdCumulativePreviewComponent } from './fd-cumulative-preview.component';

describe('FdCumulativePreviewComponent', () => {
  let component: FdCumulativePreviewComponent;
  let fixture: ComponentFixture<FdCumulativePreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FdCumulativePreviewComponent]
    });
    fixture = TestBed.createComponent(FdCumulativePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
