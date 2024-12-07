import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipAddSeasonTypesComponent } from './membership-add-season-types.component';

describe('MembershipAddSeasonTypesComponent', () => {
  let component: MembershipAddSeasonTypesComponent;
  let fixture: ComponentFixture<MembershipAddSeasonTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipAddSeasonTypesComponent]
    });
    fixture = TestBed.createComponent(MembershipAddSeasonTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
