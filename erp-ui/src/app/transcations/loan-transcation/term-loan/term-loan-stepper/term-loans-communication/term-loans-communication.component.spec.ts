import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermLoansCommunicationComponent } from './term-loans-communication.component';

describe('TermLoansCommunicationComponent', () => {
  let component: TermLoansCommunicationComponent;
  let fixture: ComponentFixture<TermLoansCommunicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermLoansCommunicationComponent]
    });
    fixture = TestBed.createComponent(TermLoansCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
