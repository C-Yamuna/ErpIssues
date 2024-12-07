import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipBasicDetailsComponent } from './membership-basic-details.component';

describe('MembershipBasicDetailsComponent', () => {
  let component: MembershipBasicDetailsComponent;
  let fixture: ComponentFixture<MembershipBasicDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipBasicDetailsComponent]
    });
    fixture = TestBed.createComponent(MembershipBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
