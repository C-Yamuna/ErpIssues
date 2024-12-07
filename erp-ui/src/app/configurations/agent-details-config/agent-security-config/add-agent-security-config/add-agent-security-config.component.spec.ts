import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAgentSecurityConfigComponent } from './add-agent-security-config.component';

describe('AddAgentSecurityConfigComponent', () => {
  let component: AddAgentSecurityConfigComponent;
  let fixture: ComponentFixture<AddAgentSecurityConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAgentSecurityConfigComponent]
    });
    fixture = TestBed.createComponent(AddAgentSecurityConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
