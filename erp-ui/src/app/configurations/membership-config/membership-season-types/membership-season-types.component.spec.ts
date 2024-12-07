import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipSeasonTypesComponent } from './membership-season-types.component';

describe('MembershipSeasonTypesComponent', () => {
  let component: MembershipSeasonTypesComponent;
  let fixture: ComponentFixture<MembershipSeasonTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipSeasonTypesComponent]
    });
    fixture = TestBed.createComponent(MembershipSeasonTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
