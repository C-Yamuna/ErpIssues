import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsBankJointAccountComponent } from './savings-bank-joint-account.component';

describe('SavingsBankJointAccountComponent', () => {
  let component: SavingsBankJointAccountComponent;
  let fixture: ComponentFixture<SavingsBankJointAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavingsBankJointAccountComponent]
    });
    fixture = TestBed.createComponent(SavingsBankJointAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
