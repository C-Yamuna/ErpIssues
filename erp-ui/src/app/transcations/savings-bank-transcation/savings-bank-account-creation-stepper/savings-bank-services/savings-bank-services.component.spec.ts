import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsBankServicesComponent } from './savings-bank-services.component';

describe('SavingsBankServicesComponent', () => {
  let component: SavingsBankServicesComponent;
  let fixture: ComponentFixture<SavingsBankServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavingsBankServicesComponent]
    });
    fixture = TestBed.createComponent(SavingsBankServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
