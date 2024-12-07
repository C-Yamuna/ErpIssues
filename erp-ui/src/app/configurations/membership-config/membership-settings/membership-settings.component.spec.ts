import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipSettingsComponent } from './membership-settings.component';

describe('MembershipSettingsComponent', () => {
  let component: MembershipSettingsComponent;
  let fixture: ComponentFixture<MembershipSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipSettingsComponent]
    });
    fixture = TestBed.createComponent(MembershipSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
