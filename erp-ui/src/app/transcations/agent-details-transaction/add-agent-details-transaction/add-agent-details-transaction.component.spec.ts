import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAgentDetailsTransactionComponent } from './add-agent-details-transaction.component';

describe('AddAgentDetailsTransactionComponent', () => {
  let component: AddAgentDetailsTransactionComponent;
  let fixture: ComponentFixture<AddAgentDetailsTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAgentDetailsTransactionComponent]
    });
    fixture = TestBed.createComponent(AddAgentDetailsTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
