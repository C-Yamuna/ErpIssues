import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositorLoanNomineeComponent } from './depositor-loan-nominee.component';

describe('DepositorLoanNomineeComponent', () => {
  let component: DepositorLoanNomineeComponent;
  let fixture: ComponentFixture<DepositorLoanNomineeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepositorLoanNomineeComponent]
    });
    fixture = TestBed.createComponent(DepositorLoanNomineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
