import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipAddUomComponent } from './membership-add-uom.component';

describe('MembershipAddUomComponent', () => {
  let component: MembershipAddUomComponent;
  let fixture: ComponentFixture<MembershipAddUomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipAddUomComponent]
    });
    fixture = TestBed.createComponent(MembershipAddUomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
