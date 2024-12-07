import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDailyDepositsComponent } from './view-daily-deposits.component';

describe('ViewDailyDepositsComponent', () => {
  let component: ViewDailyDepositsComponent;
  let fixture: ComponentFixture<ViewDailyDepositsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDailyDepositsComponent]
    });
    fixture = TestBed.createComponent(ViewDailyDepositsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
