import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdNonCumulativeComponent } from './fd-non-cumulative.component';

describe('FdNonCumulativeComponent', () => {
  let component: FdNonCumulativeComponent;
  let fixture: ComponentFixture<FdNonCumulativeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FdNonCumulativeComponent]
    });
    fixture = TestBed.createComponent(FdNonCumulativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
