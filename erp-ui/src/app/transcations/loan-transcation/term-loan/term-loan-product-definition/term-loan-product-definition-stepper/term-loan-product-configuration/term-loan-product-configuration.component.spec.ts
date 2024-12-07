import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermLoanProductConfigurationComponent } from './term-loan-product-configuration.component';

describe('TermLoanProductConfigurationComponent', () => {
  let component: TermLoanProductConfigurationComponent;
  let fixture: ComponentFixture<TermLoanProductConfigurationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermLoanProductConfigurationComponent]
    });
    fixture = TestBed.createComponent(TermLoanProductConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
