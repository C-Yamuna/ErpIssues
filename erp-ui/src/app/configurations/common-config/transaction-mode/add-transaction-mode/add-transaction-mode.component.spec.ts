import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransactionModeComponent } from './add-transaction-mode.component';

describe('AddTransactionModeComponent', () => {
  let component: AddTransactionModeComponent;
  let fixture: ComponentFixture<AddTransactionModeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTransactionModeComponent]
    });
    fixture = TestBed.createComponent(AddTransactionModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
