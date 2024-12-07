import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMembershipComponent } from './new-membership.component';

describe('NewMembershipComponent', () => {
  let component: NewMembershipComponent;
  let fixture: ComponentFixture<NewMembershipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewMembershipComponent]
    });
    fixture = TestBed.createComponent(NewMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
