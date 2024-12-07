import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoInterestPolicyConigComponent } from './sao-interest-policy-conig.component';

describe('SaoInterestPolicyConigComponent', () => {
  let component: SaoInterestPolicyConigComponent;
  let fixture: ComponentFixture<SaoInterestPolicyConigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoInterestPolicyConigComponent]
    });
    fixture = TestBed.createComponent(SaoInterestPolicyConigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
