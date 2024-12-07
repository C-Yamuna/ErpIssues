import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringDepositProductDefinitionComponent } from './recurring-deposit-product-definition.component';

describe('RecurringDepositProductDefinitionComponent', () => {
  let component: RecurringDepositProductDefinitionComponent;
  let fixture: ComponentFixture<RecurringDepositProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecurringDepositProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(RecurringDepositProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
