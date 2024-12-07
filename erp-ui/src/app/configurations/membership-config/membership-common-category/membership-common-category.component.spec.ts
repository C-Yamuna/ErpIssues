import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipCommonCategoryComponent } from './membership-common-category.component';

describe('MembershipCommonCategoryComponent', () => {
  let component: MembershipCommonCategoryComponent;
  let fixture: ComponentFixture<MembershipCommonCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipCommonCategoryComponent]
    });
    fixture = TestBed.createComponent(MembershipCommonCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
