import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBranchToBranchTransactionComponent } from './view-branch-to-branch-transaction.component';

describe('ViewBranchToBranchTransactionComponent', () => {
  let component: ViewBranchToBranchTransactionComponent;
  let fixture: ComponentFixture<ViewBranchToBranchTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewBranchToBranchTransactionComponent]
    });
    fixture = TestBed.createComponent(ViewBranchToBranchTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
