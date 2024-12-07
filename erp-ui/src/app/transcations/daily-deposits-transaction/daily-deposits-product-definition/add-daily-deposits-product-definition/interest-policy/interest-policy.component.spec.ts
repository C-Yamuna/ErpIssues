import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestPolicyComponent } from './interest-policy.component';

describe('InterestPolicyComponent', () => {
  let component: InterestPolicyComponent;
  let fixture: ComponentFixture<InterestPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterestPolicyComponent]
    });
    fixture = TestBed.createComponent(InterestPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
