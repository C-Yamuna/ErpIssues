import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSaoBorrowingProductDefinitionComponent } from './view-sao-borrowing-product-definition.component';

describe('ViewSaoBorrowingProductDefinitionComponent', () => {
  let component: ViewSaoBorrowingProductDefinitionComponent;
  let fixture: ComponentFixture<ViewSaoBorrowingProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSaoBorrowingProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(ViewSaoBorrowingProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
