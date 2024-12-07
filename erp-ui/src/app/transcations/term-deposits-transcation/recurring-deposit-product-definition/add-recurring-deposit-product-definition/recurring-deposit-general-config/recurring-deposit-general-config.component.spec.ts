import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringDepositGeneralConfigComponent } from './recurring-deposit-general-config.component';

describe('RecurringDepositGeneralConfigComponent', () => {
  let component: RecurringDepositGeneralConfigComponent;
  let fixture: ComponentFixture<RecurringDepositGeneralConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecurringDepositGeneralConfigComponent]
    });
    fixture = TestBed.createComponent(RecurringDepositGeneralConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
