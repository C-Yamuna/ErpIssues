import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoStepperComponent } from './sao-stepper.component';

describe('SaoStepperComponent', () => {
  let component: SaoStepperComponent;
  let fixture: ComponentFixture<SaoStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoStepperComponent]
    });
    fixture = TestBed.createComponent(SaoStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
