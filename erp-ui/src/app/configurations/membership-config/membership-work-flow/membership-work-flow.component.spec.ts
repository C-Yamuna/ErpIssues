import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipWorkFlowComponent } from './membership-work-flow.component';

describe('MembershipWorkFlowComponent', () => {
  let component: MembershipWorkFlowComponent;
  let fixture: ComponentFixture<MembershipWorkFlowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipWorkFlowComponent]
    });
    fixture = TestBed.createComponent(MembershipWorkFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
