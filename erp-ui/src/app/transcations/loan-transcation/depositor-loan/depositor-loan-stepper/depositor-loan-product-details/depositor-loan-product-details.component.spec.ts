import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositorLoanProductDetailsComponent } from './depositor-loan-product-details.component';

describe('DepositorLoanProductDetailsComponent', () => {
  let component: DepositorLoanProductDetailsComponent;
  let fixture: ComponentFixture<DepositorLoanProductDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepositorLoanProductDetailsComponent]
    });
    fixture = TestBed.createComponent(DepositorLoanProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
