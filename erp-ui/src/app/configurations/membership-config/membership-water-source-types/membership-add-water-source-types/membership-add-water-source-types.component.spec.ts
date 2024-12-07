import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipAddWaterSourceTypesComponent } from './membership-add-water-source-types.component';

describe('MembershipAddWaterSourceTypesComponent', () => {
  let component: MembershipAddWaterSourceTypesComponent;
  let fixture: ComponentFixture<MembershipAddWaterSourceTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipAddWaterSourceTypesComponent]
    });
    fixture = TestBed.createComponent(MembershipAddWaterSourceTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
