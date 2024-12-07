import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVaultToDccbTransactionComponent } from './view-vault-to-dccb-transaction.component';

describe('ViewVaultToDccbTransactionComponent', () => {
  let component: ViewVaultToDccbTransactionComponent;
  let fixture: ComponentFixture<ViewVaultToDccbTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewVaultToDccbTransactionComponent]
    });
    fixture = TestBed.createComponent(ViewVaultToDccbTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
