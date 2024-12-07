import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdMembershipDetailsComponent } from './rd-membership-details.component';

describe('RdMembershipDetailsComponent', () => {
  let component: RdMembershipDetailsComponent;
  let fixture: ComponentFixture<RdMembershipDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RdMembershipDetailsComponent]
    });
    fixture = TestBed.createComponent(RdMembershipDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
