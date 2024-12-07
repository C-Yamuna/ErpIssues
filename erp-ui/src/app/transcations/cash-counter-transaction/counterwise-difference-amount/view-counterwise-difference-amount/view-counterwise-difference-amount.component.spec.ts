import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCounterwiseDifferenceAmountComponent } from './view-counterwise-difference-amount.component';

describe('ViewCounterwiseDifferenceAmountComponent', () => {
  let component: ViewCounterwiseDifferenceAmountComponent;
  let fixture: ComponentFixture<ViewCounterwiseDifferenceAmountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCounterwiseDifferenceAmountComponent]
    });
    fixture = TestBed.createComponent(ViewCounterwiseDifferenceAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
