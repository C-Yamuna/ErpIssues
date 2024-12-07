import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BClassStepperComponent } from './b-class-stepper.component';

describe('BClassStepperComponent', () => {
  let component: BClassStepperComponent;
  let fixture: ComponentFixture<BClassStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BClassStepperComponent]
    });
    fixture = TestBed.createComponent(BClassStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
