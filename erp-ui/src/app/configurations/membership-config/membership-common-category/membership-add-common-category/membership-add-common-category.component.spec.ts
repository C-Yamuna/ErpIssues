import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipAddCommonCategoryComponent } from './membership-add-common-category.component';

describe('MembershipAddCommonCategoryComponent', () => {
  let component: MembershipAddCommonCategoryComponent;
  let fixture: ComponentFixture<MembershipAddCommonCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipAddCommonCategoryComponent]
    });
    fixture = TestBed.createComponent(MembershipAddCommonCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
