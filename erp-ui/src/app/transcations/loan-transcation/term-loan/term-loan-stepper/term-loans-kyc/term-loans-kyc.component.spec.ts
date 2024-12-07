import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermLoansKycComponent } from './term-loans-kyc.component';

describe('TermLoansKycComponent', () => {
  let component: TermLoansKycComponent;
  let fixture: ComponentFixture<TermLoansKycComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermLoansKycComponent]
    });
    fixture = TestBed.createComponent(TermLoansKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
