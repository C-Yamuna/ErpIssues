import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdNonCumulativeInterestPolicyComponent } from './fd-non-cumulative-interest-policy.component';

describe('FdNonCumulativeInterestPolicyComponent', () => {
  let component: FdNonCumulativeInterestPolicyComponent;
  let fixture: ComponentFixture<FdNonCumulativeInterestPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FdNonCumulativeInterestPolicyComponent]
    });
    fixture = TestBed.createComponent(FdNonCumulativeInterestPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
