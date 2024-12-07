import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsBankApplicationComponent } from './savings-bank-application.component';

describe('SavingsBankApplicationComponent', () => {
  let component: SavingsBankApplicationComponent;
  let fixture: ComponentFixture<SavingsBankApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavingsBankApplicationComponent]
    });
    fixture = TestBed.createComponent(SavingsBankApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
