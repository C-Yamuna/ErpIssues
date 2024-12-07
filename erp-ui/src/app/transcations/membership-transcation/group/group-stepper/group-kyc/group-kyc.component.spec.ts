import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupKYCComponent } from './group-kyc.component';

describe('GroupKYCComponent', () => {
  let component: GroupKYCComponent;
  let fixture: ComponentFixture<GroupKYCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupKYCComponent]
    });
    fixture = TestBed.createComponent(GroupKYCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
