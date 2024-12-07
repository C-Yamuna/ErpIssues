import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoBorrowingProductDefinitionComponent } from './sao-borrowing-product-definition.component';

describe('SaoBorrowingProductDefinitionComponent', () => {
  let component: SaoBorrowingProductDefinitionComponent;
  let fixture: ComponentFixture<SaoBorrowingProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoBorrowingProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(SaoBorrowingProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
