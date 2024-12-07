import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentRegistrationStepperComponent } from './agent-registration-stepper.component';

describe('AgentRegistrationStepperComponent', () => {
  let component: AgentRegistrationStepperComponent;
  let fixture: ComponentFixture<AgentRegistrationStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentRegistrationStepperComponent]
    });
    fixture = TestBed.createComponent(AgentRegistrationStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
