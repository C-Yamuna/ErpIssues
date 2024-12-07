import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepaymentModeComponent } from './repayment-mode.component';

describe('RepaymentModeComponent', () => {
  let component: RepaymentModeComponent;
  let fixture: ComponentFixture<RepaymentModeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepaymentModeComponent]
    });
    fixture = TestBed.createComponent(RepaymentModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
