import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdAddCommonCategoryComponent } from './td-add-common-category.component';

describe('TdAddCommonCategoryComponent', () => {
  let component: TdAddCommonCategoryComponent;
  let fixture: ComponentFixture<TdAddCommonCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TdAddCommonCategoryComponent]
    });
    fixture = TestBed.createComponent(TdAddCommonCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
