import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTermBorrowingProductDefinitionComponent } from './view-term-borrowing-product-definition.component';

describe('ViewTermBorrowingProductDefinitionComponent', () => {
  let component: ViewTermBorrowingProductDefinitionComponent;
  let fixture: ComponentFixture<ViewTermBorrowingProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTermBorrowingProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(ViewTermBorrowingProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
