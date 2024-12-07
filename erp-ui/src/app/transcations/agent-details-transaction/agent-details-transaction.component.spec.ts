import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentDetailsTransactionComponent } from './agent-details-transaction.component';

describe('AgentDetailsTransactionComponent', () => {
  let component: AgentDetailsTransactionComponent;
  let fixture: ComponentFixture<AgentDetailsTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentDetailsTransactionComponent]
    });
    fixture = TestBed.createComponent(AgentDetailsTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
