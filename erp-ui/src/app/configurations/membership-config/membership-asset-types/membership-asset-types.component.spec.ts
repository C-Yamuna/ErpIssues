import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipAssetTypesComponent } from './membership-asset-types.component';

describe('MembershipAssetTypesComponent', () => {
  let component: MembershipAssetTypesComponent;
  let fixture: ComponentFixture<MembershipAssetTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipAssetTypesComponent]
    });
    fixture = TestBed.createComponent(MembershipAssetTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
