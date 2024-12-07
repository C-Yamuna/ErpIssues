import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMembershipAddFdComponent } from './new-membership-add.component';

describe('NewMembershipAddComponent', () => {
  let component: NewMembershipAddFdComponent;
  let fixture: ComponentFixture<NewMembershipAddFdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewMembershipAddFdComponent]
    });
    fixture = TestBed.createComponent(NewMembershipAddFdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
