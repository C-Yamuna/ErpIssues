import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVaultCashComponent } from './view-vault-cash.component';

describe('ViewVaultCashComponent', () => {
  let component: ViewVaultCashComponent;
  let fixture: ComponentFixture<ViewVaultCashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewVaultCashComponent]
    });
    fixture = TestBed.createComponent(ViewVaultCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
