import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipMcrDetailsComponent } from './membership-mcr-details.component';

describe('MembershipMcrDetailsComponent', () => {
  let component: MembershipMcrDetailsComponent;
  let fixture: ComponentFixture<MembershipMcrDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipMcrDetailsComponent]
    });
    fixture = TestBed.createComponent(MembershipMcrDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
