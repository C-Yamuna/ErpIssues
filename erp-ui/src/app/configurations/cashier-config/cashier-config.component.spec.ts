import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierConfigComponent } from './cashier-config.component';

describe('CashierConfigComponent', () => {
  let component: CashierConfigComponent;
  let fixture: ComponentFixture<CashierConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CashierConfigComponent]
    });
    fixture = TestBed.createComponent(CashierConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
