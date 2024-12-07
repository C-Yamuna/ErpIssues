import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommonCategoryComponent } from './add-common-category.component';

describe('AddCommonCategoryComponent', () => {
  let component: AddCommonCategoryComponent;
  let fixture: ComponentFixture<AddCommonCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCommonCategoryComponent]
    });
    fixture = TestBed.createComponent(AddCommonCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
