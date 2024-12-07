import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiLoanApplicationDetailsComponent } from './si-loan-application-details.component';

describe('SiLoanApplicationDetailsComponent', () => {
  let component: SiLoanApplicationDetailsComponent;
  let fixture: ComponentFixture<SiLoanApplicationDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiLoanApplicationDetailsComponent]
    });
    fixture = TestBed.createComponent(SiLoanApplicationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
