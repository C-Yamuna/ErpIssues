import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdNonCumulativeStepperComponent } from './fd-non-cumulative-stepper.component';

describe('FdNonCumulativeStepperComponent', () => {
  let component: FdNonCumulativeStepperComponent;
  let fixture: ComponentFixture<FdNonCumulativeStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FdNonCumulativeStepperComponent]
    });
    fixture = TestBed.createComponent(FdNonCumulativeStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
