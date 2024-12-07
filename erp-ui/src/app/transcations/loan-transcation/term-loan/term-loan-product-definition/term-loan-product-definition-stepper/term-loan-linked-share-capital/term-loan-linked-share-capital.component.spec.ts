import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermLoanLinkedShareCapitalComponent } from './term-loan-linked-share-capital.component';

describe('TermLoanLinkedShareCapitalComponent', () => {
  let component: TermLoanLinkedShareCapitalComponent;
  let fixture: ComponentFixture<TermLoanLinkedShareCapitalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermLoanLinkedShareCapitalComponent]
    });
    fixture = TestBed.createComponent(TermLoanLinkedShareCapitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
