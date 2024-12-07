import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentsTransactionComponent } from './investments-transaction.component';

describe('InvestmentsTransactionComponent', () => {
  let component: InvestmentsTransactionComponent;
  let fixture: ComponentFixture<InvestmentsTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestmentsTransactionComponent]
    });
    fixture = TestBed.createComponent(InvestmentsTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
