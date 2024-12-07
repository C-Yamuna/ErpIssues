import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSimpleInterestLoanComponent } from './view-simple-interest-loan.component';

describe('ViewSimpleInterestLoanComponent', () => {
  let component: ViewSimpleInterestLoanComponent;
  let fixture: ComponentFixture<ViewSimpleInterestLoanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSimpleInterestLoanComponent]
    });
    fixture = TestBed.createComponent(ViewSimpleInterestLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
