import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipAddIncorporationTypesComponent } from './membership-add-incorporation-types.component';

describe('MembershipAddIncorporationTypesComponent', () => {
  let component: MembershipAddIncorporationTypesComponent;
  let fixture: ComponentFixture<MembershipAddIncorporationTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipAddIncorporationTypesComponent]
    });
    fixture = TestBed.createComponent(MembershipAddIncorporationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
