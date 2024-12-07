import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyDepositsProductDefinitionComponent } from './daily-deposits-product-definition.component';

describe('DailyDepositsProductDefinitionComponent', () => {
  let component: DailyDepositsProductDefinitionComponent;
  let fixture: ComponentFixture<DailyDepositsProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyDepositsProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(DailyDepositsProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
