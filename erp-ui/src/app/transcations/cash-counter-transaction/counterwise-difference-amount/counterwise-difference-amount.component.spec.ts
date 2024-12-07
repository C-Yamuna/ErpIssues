import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterwiseDifferenceAmountComponent } from './counterwise-difference-amount.component';

describe('CounterwiseDifferenceAmountComponent', () => {
  let component: CounterwiseDifferenceAmountComponent;
  let fixture: ComponentFixture<CounterwiseDifferenceAmountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CounterwiseDifferenceAmountComponent]
    });
    fixture = TestBed.createComponent(CounterwiseDifferenceAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
