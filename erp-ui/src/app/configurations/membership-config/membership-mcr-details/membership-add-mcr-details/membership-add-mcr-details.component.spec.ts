import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipAddMcrDetailsComponent } from './membership-add-mcr-details.component';

describe('MembershipAddMcrDetailsComponent', () => {
  let component: MembershipAddMcrDetailsComponent;
  let fixture: ComponentFixture<MembershipAddMcrDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipAddMcrDetailsComponent]
    });
    fixture = TestBed.createComponent(MembershipAddMcrDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
