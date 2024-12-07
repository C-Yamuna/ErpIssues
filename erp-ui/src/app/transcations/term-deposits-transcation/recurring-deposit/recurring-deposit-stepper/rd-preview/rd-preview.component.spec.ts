import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdPreviewComponent } from './rd-preview.component';

describe('RdPreviewComponent', () => {
  let component: RdPreviewComponent;
  let fixture: ComponentFixture<RdPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RdPreviewComponent]
    });
    fixture = TestBed.createComponent(RdPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
