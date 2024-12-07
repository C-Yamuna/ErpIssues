import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierScrollComponent } from './cashier-scroll.component';

describe('CashierScrollComponent', () => {
  let component: CashierScrollComponent;
  let fixture: ComponentFixture<CashierScrollComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CashierScrollComponent]
    });
    fixture = TestBed.createComponent(CashierScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
