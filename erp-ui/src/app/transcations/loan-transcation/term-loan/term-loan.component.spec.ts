import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermLoanComponent } from './term-loan.component';

describe('TermLoanComponent', () => {
  let component: TermLoanComponent;
  let fixture: ComponentFixture<TermLoanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermLoanComponent]
    });
    fixture = TestBed.createComponent(TermLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
