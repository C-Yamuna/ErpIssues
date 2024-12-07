import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipWaterSourceTypesComponent } from './membership-water-source-types.component';

describe('MembershipWaterSourceTypesComponent', () => {
  let component: MembershipWaterSourceTypesComponent;
  let fixture: ComponentFixture<MembershipWaterSourceTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipWaterSourceTypesComponent]
    });
    fixture = TestBed.createComponent(MembershipWaterSourceTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
