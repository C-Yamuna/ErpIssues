import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdNonCumulativeJointHolderDetailsComponent } from './fd-non-cumulative-joint-holder-details.component';

describe('FdNonCumulativeJointHolderDetailsComponent', () => {
  let component: FdNonCumulativeJointHolderDetailsComponent;
  let fixture: ComponentFixture<FdNonCumulativeJointHolderDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FdNonCumulativeJointHolderDetailsComponent]
    });
    fixture = TestBed.createComponent(FdNonCumulativeJointHolderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
