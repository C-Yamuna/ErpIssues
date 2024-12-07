import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAgentCommissionPolicyComponent } from './add-agent-commission-policy.component';

describe('AddAgentCommissionPolicyComponent', () => {
  let component: AddAgentCommissionPolicyComponent;
  let fixture: ComponentFixture<AddAgentCommissionPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAgentCommissionPolicyComponent]
    });
    fixture = TestBed.createComponent(AddAgentCommissionPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
