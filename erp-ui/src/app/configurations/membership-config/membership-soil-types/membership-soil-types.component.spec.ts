import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipSoilTypesComponent } from './membership-soil-types.component';

describe('MembershipSoilTypesComponent', () => {
  let component: MembershipSoilTypesComponent;
  let fixture: ComponentFixture<MembershipSoilTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipSoilTypesComponent]
    });
    fixture = TestBed.createComponent(MembershipSoilTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
