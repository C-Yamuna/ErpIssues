import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInvestmentsTransactionComponent } from './view-investments-transaction.component';

describe('ViewInvestmentsTransactionComponent', () => {
  let component: ViewInvestmentsTransactionComponent;
  let fixture: ComponentFixture<ViewInvestmentsTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewInvestmentsTransactionComponent]
    });
    fixture = TestBed.createComponent(ViewInvestmentsTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
