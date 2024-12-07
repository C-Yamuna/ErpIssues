import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaultCashComponent } from './vault-cash.component';

describe('VaultCashComponent', () => {
  let component: VaultCashComponent;
  let fixture: ComponentFixture<VaultCashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VaultCashComponent]
    });
    fixture = TestBed.createComponent(VaultCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
