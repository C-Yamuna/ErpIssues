import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentDetailsConfigComponent } from './agent-details-config.component';

describe('AgentDetailsConfigComponent', () => {
  let component: AgentDetailsConfigComponent;
  let fixture: ComponentFixture<AgentDetailsConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentDetailsConfigComponent]
    });
    fixture = TestBed.createComponent(AgentDetailsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
