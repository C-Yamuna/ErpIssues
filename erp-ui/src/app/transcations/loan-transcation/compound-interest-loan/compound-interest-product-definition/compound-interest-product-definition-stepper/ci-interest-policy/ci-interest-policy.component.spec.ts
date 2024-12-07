import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiInterestPolicyComponent } from './ci-interest-policy.component';

describe('CiInterestPolicyComponent', () => {
  let component: CiInterestPolicyComponent;
  let fixture: ComponentFixture<CiInterestPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CiInterestPolicyComponent]
    });
    fixture = TestBed.createComponent(CiInterestPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
