import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecurringDepositProductDefinitionComponent } from './add-recurring-deposit-product-definition.component';

describe('AddRecurringDepositProductDefinitionComponent', () => {
  let component: AddRecurringDepositProductDefinitionComponent;
  let fixture: ComponentFixture<AddRecurringDepositProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRecurringDepositProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(AddRecurringDepositProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
