import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionCalculationComponent } from './commission-calculation.component';

describe('CommissionCalculationComponent', () => {
  let component: CommissionCalculationComponent;
  let fixture: ComponentFixture<CommissionCalculationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommissionCalculationComponent]
    });
    fixture = TestBed.createComponent(CommissionCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
