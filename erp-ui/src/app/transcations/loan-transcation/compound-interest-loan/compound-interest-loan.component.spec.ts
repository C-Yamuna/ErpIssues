import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundInterestLoanComponent } from './compound-interest-loan.component';

describe('CompoundInterestLoanComponent', () => {
  let component: CompoundInterestLoanComponent;
  let fixture: ComponentFixture<CompoundInterestLoanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompoundInterestLoanComponent]
    });
    fixture = TestBed.createComponent(CompoundInterestLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
