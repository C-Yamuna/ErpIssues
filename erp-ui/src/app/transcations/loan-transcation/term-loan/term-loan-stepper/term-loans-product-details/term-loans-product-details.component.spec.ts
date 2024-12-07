import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermLoansProductDetailsComponent } from './term-loans-product-details.component';

describe('TermLoansProductDetailsComponent', () => {
  let component: TermLoansProductDetailsComponent;
  let fixture: ComponentFixture<TermLoansProductDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermLoansProductDetailsComponent]
    });
    fixture = TestBed.createComponent(TermLoansProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
