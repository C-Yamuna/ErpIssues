import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCounterwiseDifferenceAmountComponent } from './add-counterwise-difference-amount.component';

describe('AddCounterwiseDifferenceAmountComponent', () => {
  let component: AddCounterwiseDifferenceAmountComponent;
  let fixture: ComponentFixture<AddCounterwiseDifferenceAmountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCounterwiseDifferenceAmountComponent]
    });
    fixture = TestBed.createComponent(AddCounterwiseDifferenceAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
