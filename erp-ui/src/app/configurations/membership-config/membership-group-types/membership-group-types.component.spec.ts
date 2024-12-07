import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipGroupTypesComponent } from './membership-group-types.component';

describe('MembershipGroupTypesComponent', () => {
  let component: MembershipGroupTypesComponent;
  let fixture: ComponentFixture<MembershipGroupTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipGroupTypesComponent]
    });
    fixture = TestBed.createComponent(MembershipGroupTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
