import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockerTransactionComponent } from './locker-transaction.component';

describe('LockerTransactionComponent', () => {
  let component: LockerTransactionComponent;
  let fixture: ComponentFixture<LockerTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LockerTransactionComponent]
    });
    fixture = TestBed.createComponent(LockerTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
