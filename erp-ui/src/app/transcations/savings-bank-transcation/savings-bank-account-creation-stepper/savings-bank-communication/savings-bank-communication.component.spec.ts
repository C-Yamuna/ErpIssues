import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsBankCommunicationComponent } from './savings-bank-communication.component';

describe('SavingsBankCommunicationComponent', () => {
  let component: SavingsBankCommunicationComponent;
  let fixture: ComponentFixture<SavingsBankCommunicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavingsBankCommunicationComponent]
    });
    fixture = TestBed.createComponent(SavingsBankCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
