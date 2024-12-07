import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyDepositsConfigComponent } from './daily-deposits-config.component';

describe('DailyDepositsConfigComponent', () => {
  let component: DailyDepositsConfigComponent;
  let fixture: ComponentFixture<DailyDepositsConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyDepositsConfigComponent]
    });
    fixture = TestBed.createComponent(DailyDepositsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
