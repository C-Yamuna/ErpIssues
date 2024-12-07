import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipBasicRequiredDetailsComponent } from './membership-basic-required-details.component';

describe('MembershipBasicRequiredDetailsComponent', () => {
  let component: MembershipBasicRequiredDetailsComponent;
  let fixture: ComponentFixture<MembershipBasicRequiredDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipBasicRequiredDetailsComponent]
    });
    fixture = TestBed.createComponent(MembershipBasicRequiredDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
