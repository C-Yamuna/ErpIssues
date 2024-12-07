import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdCommonCategoryComponent } from './td-common-category.component';

describe('TdCommonCategoryComponent', () => {
  let component: TdCommonCategoryComponent;
  let fixture: ComponentFixture<TdCommonCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TdCommonCategoryComponent]
    });
    fixture = TestBed.createComponent(TdCommonCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
