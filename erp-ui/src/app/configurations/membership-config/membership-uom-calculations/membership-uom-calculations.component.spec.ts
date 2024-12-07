import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipUomCalculationsComponent } from './membership-uom-calculations.component';

describe('MembershipUomCalculationsComponent', () => {
  let component: MembershipUomCalculationsComponent;
  let fixture: ComponentFixture<MembershipUomCalculationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipUomCalculationsComponent]
    });
    fixture = TestBed.createComponent(MembershipUomCalculationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
