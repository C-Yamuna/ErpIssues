import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositorLoanCommunicationComponent } from './depositor-loan-communication.component';

describe('DepositorLoanCommunicationComponent', () => {
  let component: DepositorLoanCommunicationComponent;
  let fixture: ComponentFixture<DepositorLoanCommunicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepositorLoanCommunicationComponent]
    });
    fixture = TestBed.createComponent(DepositorLoanCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
