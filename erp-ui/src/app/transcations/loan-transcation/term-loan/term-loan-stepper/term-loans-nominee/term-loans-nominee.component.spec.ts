import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermLoansNomineeComponent } from './term-loans-nominee.component';

describe('TermLoansNomineeComponent', () => {
  let component: TermLoansNomineeComponent;
  let fixture: ComponentFixture<TermLoansNomineeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermLoansNomineeComponent]
    });
    fixture = TestBed.createComponent(TermLoansNomineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
