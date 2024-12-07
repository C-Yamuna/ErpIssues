import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDailyDepositsProductDefinitionComponent } from './view-daily-deposits-product-definition.component';

describe('ViewDailyDepositsProductDefinitionComponent', () => {
  let component: ViewDailyDepositsProductDefinitionComponent;
  let fixture: ComponentFixture<ViewDailyDepositsProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDailyDepositsProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(ViewDailyDepositsProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
