import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoInterestPolicyConfigComponent } from './sao-interest-policy-config.component';

describe('SaoInterestPolicyConfigComponent', () => {
  let component: SaoInterestPolicyConfigComponent;
  let fixture: ComponentFixture<SaoInterestPolicyConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoInterestPolicyConfigComponent]
    });
    fixture = TestBed.createComponent(SaoInterestPolicyConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
