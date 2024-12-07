import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiInterestPolicyComponent } from './si-interest-policy.component';

describe('SiInterestPolicyComponent', () => {
  let component: SiInterestPolicyComponent;
  let fixture: ComponentFixture<SiInterestPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiInterestPolicyComponent]
    });
    fixture = TestBed.createComponent(SiInterestPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
