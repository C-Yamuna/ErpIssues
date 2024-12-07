import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermInterestPolicyComponent } from './term-interest-policy.component';

describe('TermInterestPolicyComponent', () => {
  let component: TermInterestPolicyComponent;
  let fixture: ComponentFixture<TermInterestPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermInterestPolicyComponent]
    });
    fixture = TestBed.createComponent(TermInterestPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
