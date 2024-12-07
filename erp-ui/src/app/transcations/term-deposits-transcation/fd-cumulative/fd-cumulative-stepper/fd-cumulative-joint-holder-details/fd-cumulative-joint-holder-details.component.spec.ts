import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdCumulativeJointHolderDetailsComponent } from './fd-cumulative-joint-holder-details.component';

describe('FdCumulativeJointHolderDetailsComponent', () => {
  let component: FdCumulativeJointHolderDetailsComponent;
  let fixture: ComponentFixture<FdCumulativeJointHolderDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FdCumulativeJointHolderDetailsComponent]
    });
    fixture = TestBed.createComponent(FdCumulativeJointHolderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
