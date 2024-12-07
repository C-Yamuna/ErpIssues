import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsBankAccountCreationStepperComponent } from './savings-bank-account-creation-stepper.component';

describe('SavingsBankAccountCreationStepperComponent', () => {
  let component: SavingsBankAccountCreationStepperComponent;
  let fixture: ComponentFixture<SavingsBankAccountCreationStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavingsBankAccountCreationStepperComponent]
    });
    fixture = TestBed.createComponent(SavingsBankAccountCreationStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
