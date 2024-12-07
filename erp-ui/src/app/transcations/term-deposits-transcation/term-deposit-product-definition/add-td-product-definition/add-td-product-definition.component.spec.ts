import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTdProductDefinitionComponent } from './add-td-product-definition.component';

describe('AddTdProductDefinitionComponent', () => {
  let component: AddTdProductDefinitionComponent;
  let fixture: ComponentFixture<AddTdProductDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTdProductDefinitionComponent]
    });
    fixture = TestBed.createComponent(AddTdProductDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
