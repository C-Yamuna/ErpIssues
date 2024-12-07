import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipTranscationComponent } from './membership-transcation.component';

describe('MembershipTranscationComponent', () => {
  let component: MembershipTranscationComponent;
  let fixture: ComponentFixture<MembershipTranscationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipTranscationComponent]
    });
    fixture = TestBed.createComponent(MembershipTranscationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
