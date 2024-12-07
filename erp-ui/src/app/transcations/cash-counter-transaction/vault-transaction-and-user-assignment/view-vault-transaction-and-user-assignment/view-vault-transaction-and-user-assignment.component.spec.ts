import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVaultTransactionAndUserAssignmentComponent } from './view-vault-transaction-and-user-assignment.component';

describe('ViewVaultTransactionAndUserAssignmentComponent', () => {
  let component: ViewVaultTransactionAndUserAssignmentComponent;
  let fixture: ComponentFixture<ViewVaultTransactionAndUserAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewVaultTransactionAndUserAssignmentComponent]
    });
    fixture = TestBed.createComponent(ViewVaultTransactionAndUserAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
