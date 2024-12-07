import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipAddAssetTypesComponent } from './membership-add-asset-types.component';

describe('MembershipAddAssetTypesComponent', () => {
  let component: MembershipAddAssetTypesComponent;
  let fixture: ComponentFixture<MembershipAddAssetTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipAddAssetTypesComponent]
    });
    fixture = TestBed.createComponent(MembershipAddAssetTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
