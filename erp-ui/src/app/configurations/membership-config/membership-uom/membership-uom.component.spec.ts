import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipUomComponent } from './membership-uom.component';

describe('MembershipUomComponent', () => {
  let component: MembershipUomComponent;
  let fixture: ComponentFixture<MembershipUomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipUomComponent]
    });
    fixture = TestBed.createComponent(MembershipUomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
