import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCashCounterComponent } from './view-cash-counter.component';

describe('ViewCashCounterComponent', () => {
  let component: ViewCashCounterComponent;
  let fixture: ComponentFixture<ViewCashCounterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCashCounterComponent]
    });
    fixture = TestBed.createComponent(ViewCashCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
