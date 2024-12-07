import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsBankNomineeComponent } from './savings-bank-nominee.component';

describe('SavingsBankNomineeComponent', () => {
  let component: SavingsBankNomineeComponent;
  let fixture: ComponentFixture<SavingsBankNomineeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavingsBankNomineeComponent]
    });
    fixture = TestBed.createComponent(SavingsBankNomineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
