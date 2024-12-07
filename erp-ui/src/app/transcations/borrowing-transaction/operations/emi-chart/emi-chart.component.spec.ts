import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmiChartComponent } from './emi-chart.component';

describe('EmiChartComponent', () => {
  let component: EmiChartComponent;
  let fixture: ComponentFixture<EmiChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmiChartComponent]
    });
    fixture = TestBed.createComponent(EmiChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
