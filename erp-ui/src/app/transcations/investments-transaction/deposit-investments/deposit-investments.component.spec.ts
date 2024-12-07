import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositInvestmentsComponent } from './deposit-investments.component';

describe('DepositInvestmentsComponent', () => {
  let component: DepositInvestmentsComponent;
  let fixture: ComponentFixture<DepositInvestmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepositInvestmentsComponent]
    });
    fixture = TestBed.createComponent(DepositInvestmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
