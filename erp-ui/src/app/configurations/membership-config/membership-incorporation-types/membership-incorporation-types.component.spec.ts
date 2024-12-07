import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipIncorporationTypesComponent } from './membership-incorporation-types.component';

describe('MembershipIncorporationTypesComponent', () => {
  let component: MembershipIncorporationTypesComponent;
  let fixture: ComponentFixture<MembershipIncorporationTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipIncorporationTypesComponent]
    });
    fixture = TestBed.createComponent(MembershipIncorporationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
