import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiBorrowingProductDefinitionComponent } from './ci-borrowing-product-definition.component';

describe('CiBorrowingProductDefinitionComponent', () => {
  let component: CiBorrowingProductDefinitionComponent;
  let fixture: ComponentFixture<CiBorrowingProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CiBorrowingProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(CiBorrowingProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
