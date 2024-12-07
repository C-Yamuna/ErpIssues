import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentChartsComponent } from './installment-charts.component';

describe('InstallmentChartsComponent', () => {
  let component: InstallmentChartsComponent;
  let fixture: ComponentFixture<InstallmentChartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstallmentChartsComponent]
    });
    fixture = TestBed.createComponent(InstallmentChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
