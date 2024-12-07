import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanTranscationComponent } from './loan-transcation.component';

describe('LoanTranscationComponent', () => {
  let component: LoanTranscationComponent;
  let fixture: ComponentFixture<LoanTranscationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanTranscationComponent]
    });
    fixture = TestBed.createComponent(LoanTranscationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
