import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipAddUomCalculationsComponent } from './membership-add-uom-calculations.component';

describe('MembershipAddUomCalculationsComponent', () => {
  let component: MembershipAddUomCalculationsComponent;
  let fixture: ComponentFixture<MembershipAddUomCalculationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipAddUomCalculationsComponent]
    });
    fixture = TestBed.createComponent(MembershipAddUomCalculationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
