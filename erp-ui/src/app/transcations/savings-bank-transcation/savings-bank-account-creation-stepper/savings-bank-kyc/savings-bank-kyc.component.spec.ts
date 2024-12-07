import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsBankKycComponent } from './savings-bank-kyc.component';

describe('SavingsBankKycComponent', () => {
  let component: SavingsBankKycComponent;
  let fixture: ComponentFixture<SavingsBankKycComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavingsBankKycComponent]
    });
    fixture = TestBed.createComponent(SavingsBankKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
