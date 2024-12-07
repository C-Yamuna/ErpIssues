import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsBankTranscationComponent } from './savings-bank-transcation.component';

describe('SavingsBankTranscationComponent', () => {
  let component: SavingsBankTranscationComponent;
  let fixture: ComponentFixture<SavingsBankTranscationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavingsBankTranscationComponent]
    });
    fixture = TestBed.createComponent(SavingsBankTranscationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
