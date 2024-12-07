import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaultToDccbTransactionComponent } from './vault-to-dccb-transaction.component';

describe('VaultToDccbTransactionComponent', () => {
  let component: VaultToDccbTransactionComponent;
  let fixture: ComponentFixture<VaultToDccbTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VaultToDccbTransactionComponent]
    });
    fixture = TestBed.createComponent(VaultToDccbTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
