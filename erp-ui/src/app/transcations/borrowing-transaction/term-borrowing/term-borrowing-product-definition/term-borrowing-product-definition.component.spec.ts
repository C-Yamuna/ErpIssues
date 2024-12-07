import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermBorrowingProductDefinitionComponent } from './term-borrowing-product-definition.component';

describe('TermBorrowingProductDefinitionComponent', () => {
  let component: TermBorrowingProductDefinitionComponent;
  let fixture: ComponentFixture<TermBorrowingProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermBorrowingProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(TermBorrowingProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
