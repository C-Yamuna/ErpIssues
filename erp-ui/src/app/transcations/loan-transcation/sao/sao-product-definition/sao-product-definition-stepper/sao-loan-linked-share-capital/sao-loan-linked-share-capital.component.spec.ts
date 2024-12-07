import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoLoanLinkedShareCapitalComponent } from './sao-loan-linked-share-capital.component';

describe('SaoLoanLinkedShareCapitalComponent', () => {
  let component: SaoLoanLinkedShareCapitalComponent;
  let fixture: ComponentFixture<SaoLoanLinkedShareCapitalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoLoanLinkedShareCapitalComponent]
    });
    fixture = TestBed.createComponent(SaoLoanLinkedShareCapitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
