import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAgentDetailsTransactionComponent } from './view-agent-details-transaction.component';

describe('ViewAgentDetailsTransactionComponent', () => {
  let component: ViewAgentDetailsTransactionComponent;
  let fixture: ComponentFixture<ViewAgentDetailsTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAgentDetailsTransactionComponent]
    });
    fixture = TestBed.createComponent(ViewAgentDetailsTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
