import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCiBorrowingProductDefinitionComponent } from './view-ci-borrowing-product-definition.component';

describe('ViewCiBorrowingProductDefinitionComponent', () => {
  let component: ViewCiBorrowingProductDefinitionComponent;
  let fixture: ComponentFixture<ViewCiBorrowingProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCiBorrowingProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(ViewCiBorrowingProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
