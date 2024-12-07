import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInvestedBankDetailsComponent } from './add-invested-bank-details.component';

describe('AddInvestedBankDetailsComponent', () => {
  let component: AddInvestedBankDetailsComponent;
  let fixture: ComponentFixture<AddInvestedBankDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddInvestedBankDetailsComponent]
    });
    fixture = TestBed.createComponent(AddInvestedBankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
