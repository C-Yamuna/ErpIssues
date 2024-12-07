import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdCumulativeComponent } from './fd-cumulative.component';

describe('FdCumulativeComponent', () => {
  let component: FdCumulativeComponent;
  let fixture: ComponentFixture<FdCumulativeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FdCumulativeComponent]
    });
    fixture = TestBed.createComponent(FdCumulativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
