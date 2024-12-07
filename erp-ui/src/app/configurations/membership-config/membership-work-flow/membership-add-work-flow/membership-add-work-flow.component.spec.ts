import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipAddWorkFlowComponent } from './membership-add-work-flow.component';

describe('MembershipAddWorkFlowComponent', () => {
  let component: MembershipAddWorkFlowComponent;
  let fixture: ComponentFixture<MembershipAddWorkFlowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipAddWorkFlowComponent]
    });
    fixture = TestBed.createComponent(MembershipAddWorkFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
