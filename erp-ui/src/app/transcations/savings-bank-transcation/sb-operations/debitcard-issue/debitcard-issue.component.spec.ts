import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitcardIssueComponent } from './debitcard-issue.component';

describe('DebitcardIssueComponent', () => {
  let component: DebitcardIssueComponent;
  let fixture: ComponentFixture<DebitcardIssueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebitcardIssueComponent]
    });
    fixture = TestBed.createComponent(DebitcardIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
