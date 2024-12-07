import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSiBorrowingProductDefinitionComponent } from './view-si-borrowing-product-definition.component';

describe('ViewSiBorrowingProductDefinitionComponent', () => {
  let component: ViewSiBorrowingProductDefinitionComponent;
  let fixture: ComponentFixture<ViewSiBorrowingProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSiBorrowingProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(ViewSiBorrowingProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
