import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaultCreationTransactionComponent } from './vault-creation-transaction.component';

describe('VaultCreationTransactionComponent', () => {
  let component: VaultCreationTransactionComponent;
  let fixture: ComponentFixture<VaultCreationTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VaultCreationTransactionComponent]
    });
    fixture = TestBed.createComponent(VaultCreationTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
