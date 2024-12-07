import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiLoanJointAccountComponent } from './si-loan-joint-account.component';

describe('SiLoanJointAccountComponent', () => {
  let component: SiLoanJointAccountComponent;
  let fixture: ComponentFixture<SiLoanJointAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiLoanJointAccountComponent]
    });
    fixture = TestBed.createComponent(SiLoanJointAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
