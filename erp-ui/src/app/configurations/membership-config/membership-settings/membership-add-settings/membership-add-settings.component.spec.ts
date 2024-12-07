import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipAddSettingsComponent } from './membership-add-settings.component';

describe('MembershipAddSettingsComponent', () => {
  let component: MembershipAddSettingsComponent;
  let fixture: ComponentFixture<MembershipAddSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipAddSettingsComponent]
    });
    fixture = TestBed.createComponent(MembershipAddSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
