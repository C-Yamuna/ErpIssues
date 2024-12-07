import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTermLoanProductDefinitionComponent } from './view-term-loan-product-definition.component';

describe('ViewTermLoanProductDefinitionComponent', () => {
  let component: ViewTermLoanProductDefinitionComponent;
  let fixture: ComponentFixture<ViewTermLoanProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTermLoanProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(ViewTermLoanProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
