import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecurringDepositProductDefinitionComponent } from './view-recurring-deposit-product-definition.component';

describe('ViewRecurringDepositProductDefinitionComponent', () => {
  let component: ViewRecurringDepositProductDefinitionComponent;
  let fixture: ComponentFixture<ViewRecurringDepositProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewRecurringDepositProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(ViewRecurringDepositProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
