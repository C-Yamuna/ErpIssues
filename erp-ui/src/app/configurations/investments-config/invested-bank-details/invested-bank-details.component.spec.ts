import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestedBankDetailsComponent } from './invested-bank-details.component';

describe('InvestedBankDetailsComponent', () => {
  let component: InvestedBankDetailsComponent;
  let fixture: ComponentFixture<InvestedBankDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestedBankDetailsComponent]
    });
    fixture = TestBed.createComponent(InvestedBankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
