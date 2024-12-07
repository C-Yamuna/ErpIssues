import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentSecurityConfigComponent } from './agent-security-config.component';

describe('AgentSecurityConfigComponent', () => {
  let component: AgentSecurityConfigComponent;
  let fixture: ComponentFixture<AgentSecurityConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentSecurityConfigComponent]
    });
    fixture = TestBed.createComponent(AgentSecurityConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
