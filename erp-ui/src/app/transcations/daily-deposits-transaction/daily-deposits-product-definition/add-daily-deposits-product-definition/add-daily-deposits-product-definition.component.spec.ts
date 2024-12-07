import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDailyDepositsProductDefinitionComponent } from './add-daily-deposits-product-definition.component';

describe('AddDailyDepositsProductDefinitionComponent', () => {
  let component: AddDailyDepositsProductDefinitionComponent;
  let fixture: ComponentFixture<AddDailyDepositsProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDailyDepositsProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(AddDailyDepositsProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
