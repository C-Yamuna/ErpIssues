import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMappingComponent } from './product-mapping.component';

describe('ProductMappingComponent', () => {
  let component: ProductMappingComponent;
  let fixture: ComponentFixture<ProductMappingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductMappingComponent]
    });
    fixture = TestBed.createComponent(ProductMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
