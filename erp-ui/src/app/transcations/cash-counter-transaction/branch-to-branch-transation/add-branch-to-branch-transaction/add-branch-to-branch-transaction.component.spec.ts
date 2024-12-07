import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBranchToBranchTransactionComponent } from './add-branch-to-branch-transaction.component';

describe('AddBranchToBranchTransactionComponent', () => {
  let component: AddBranchToBranchTransactionComponent;
  let fixture: ComponentFixture<AddBranchToBranchTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBranchToBranchTransactionComponent]
    });
    fixture = TestBed.createComponent(AddBranchToBranchTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
