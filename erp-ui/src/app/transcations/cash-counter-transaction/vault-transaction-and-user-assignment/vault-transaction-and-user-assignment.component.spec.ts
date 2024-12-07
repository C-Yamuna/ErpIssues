import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaultTransactionAndUserAssignmentComponent } from './vault-transaction-and-user-assignment.component';

describe('VaultTransactionAndUserAssignmentComponent', () => {
  let component: VaultTransactionAndUserAssignmentComponent;
  let fixture: ComponentFixture<VaultTransactionAndUserAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VaultTransactionAndUserAssignmentComponent]
    });
    fixture = TestBed.createComponent(VaultTransactionAndUserAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
