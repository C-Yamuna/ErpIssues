import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermLoanProductDefinitionComponent } from './term-loan-product-definition.component';

describe('TermLoanProductDefinitionComponent', () => {
  let component: TermLoanProductDefinitionComponent;
  let fixture: ComponentFixture<TermLoanProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermLoanProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(TermLoanProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
