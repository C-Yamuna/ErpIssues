import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterDenominationComponent } from './counter-denomination.component';

describe('CounterDenominationComponent', () => {
  let component: CounterDenominationComponent;
  let fixture: ComponentFixture<CounterDenominationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CounterDenominationComponent]
    });
    fixture = TestBed.createComponent(CounterDenominationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
