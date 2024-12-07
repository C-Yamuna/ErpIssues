import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoanAccountTypeComponent } from './add-loan-account-type.component';

describe('AddLoanAccountTypeComponent', () => {
  let component: AddLoanAccountTypeComponent;
  let fixture: ComponentFixture<AddLoanAccountTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLoanAccountTypeComponent]
    });
    fixture = TestBed.createComponent(AddLoanAccountTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
