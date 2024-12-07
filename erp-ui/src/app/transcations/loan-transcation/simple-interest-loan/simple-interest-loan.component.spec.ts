import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleInterestLoanComponent } from './simple-interest-loan.component';

describe('SimpleInterestLoanComponent', () => {
  let component: SimpleInterestLoanComponent;
  let fixture: ComponentFixture<SimpleInterestLoanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleInterestLoanComponent]
    });
    fixture = TestBed.createComponent(SimpleInterestLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
