import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRepaymentModeComponent } from './add-repayment-mode.component';

describe('AddRepaymentModeComponent', () => {
  let component: AddRepaymentModeComponent;
  let fixture: ComponentFixture<AddRepaymentModeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRepaymentModeComponent]
    });
    fixture = TestBed.createComponent(AddRepaymentModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
