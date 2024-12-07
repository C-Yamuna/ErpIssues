import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoanPurposeComponent } from './add-loan-purpose.component';

describe('AddLoanPurposeComponent', () => {
  let component: AddLoanPurposeComponent;
  let fixture: ComponentFixture<AddLoanPurposeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLoanPurposeComponent]
    });
    fixture = TestBed.createComponent(AddLoanPurposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
