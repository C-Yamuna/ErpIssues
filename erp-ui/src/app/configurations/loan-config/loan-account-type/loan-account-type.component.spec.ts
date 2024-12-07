import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAccountTypeComponent } from './loan-account-type.component';

describe('LoanAccountTypeComponent', () => {
  let component: LoanAccountTypeComponent;
  let fixture: ComponentFixture<LoanAccountTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanAccountTypeComponent]
    });
    fixture = TestBed.createComponent(LoanAccountTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
