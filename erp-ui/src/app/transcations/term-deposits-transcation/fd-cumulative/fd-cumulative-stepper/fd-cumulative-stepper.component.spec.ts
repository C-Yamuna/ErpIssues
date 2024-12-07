import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdCumulativeStepperComponent } from './fd-cumulative-stepper.component';

describe('FdCumulativeStepperComponent', () => {
  let component: FdCumulativeStepperComponent;
  let fixture: ComponentFixture<FdCumulativeStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FdCumulativeStepperComponent]
    });
    fixture = TestBed.createComponent(FdCumulativeStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
