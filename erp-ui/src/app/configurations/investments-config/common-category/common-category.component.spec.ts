import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonCategoryComponent } from './common-category.component';

describe('CommonCategoryComponent', () => {
  let component: CommonCategoryComponent;
  let fixture: ComponentFixture<CommonCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommonCategoryComponent]
    });
    fixture = TestBed.createComponent(CommonCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
