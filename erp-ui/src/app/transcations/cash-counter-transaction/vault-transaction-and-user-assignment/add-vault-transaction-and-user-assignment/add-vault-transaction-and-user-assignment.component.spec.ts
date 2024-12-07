import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVaultTransactionAndUserAssignmentComponent } from './add-vault-transaction-and-user-assignment.component';

describe('AddVaultTransactionAndUserAssignmentComponent', () => {
  let component: AddVaultTransactionAndUserAssignmentComponent;
  let fixture: ComponentFixture<AddVaultTransactionAndUserAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddVaultTransactionAndUserAssignmentComponent]
    });
    fixture = TestBed.createComponent(AddVaultTransactionAndUserAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
