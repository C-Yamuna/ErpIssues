import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMembershipAddComponent } from './new-membership-add.component';

describe('NewMembershipAddComponent', () => {
  let component: NewMembershipAddComponent;
  let fixture: ComponentFixture<NewMembershipAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewMembershipAddComponent]
    });
    fixture = TestBed.createComponent(NewMembershipAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
