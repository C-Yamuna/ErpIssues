import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVaultToDccbTransactionComponent } from './add-vault-to-dccb-transaction.component';

describe('AddVaultToDccbTransactionComponent', () => {
  let component: AddVaultToDccbTransactionComponent;
  let fixture: ComponentFixture<AddVaultToDccbTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddVaultToDccbTransactionComponent]
    });
    fixture = TestBed.createComponent(AddVaultToDccbTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
