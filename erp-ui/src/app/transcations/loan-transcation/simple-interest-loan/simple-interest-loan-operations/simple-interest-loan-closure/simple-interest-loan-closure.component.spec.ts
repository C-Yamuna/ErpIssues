import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleInterestLoanClosureComponent } from './simple-interest-loan-closure.component';

describe('SimpleInterestLoanClosureComponent', () => {
  let component: SimpleInterestLoanClosureComponent;
  let fixture: ComponentFixture<SimpleInterestLoanClosureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleInterestLoanClosureComponent]
    });
    fixture = TestBed.createComponent(SimpleInterestLoanClosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
