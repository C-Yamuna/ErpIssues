import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentCommissionPolicyComponent } from './agent-commission-policy.component';

describe('AgentCommissionPolicyComponent', () => {
  let component: AgentCommissionPolicyComponent;
  let fixture: ComponentFixture<AgentCommissionPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentCommissionPolicyComponent]
    });
    fixture = TestBed.createComponent(AgentCommissionPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
