import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductTypeComponent } from './add-product-type.component';

describe('AddProductTypeComponent', () => {
  let component: AddProductTypeComponent;
  let fixture: ComponentFixture<AddProductTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProductTypeComponent]
    });
    fixture = TestBed.createComponent(AddProductTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
