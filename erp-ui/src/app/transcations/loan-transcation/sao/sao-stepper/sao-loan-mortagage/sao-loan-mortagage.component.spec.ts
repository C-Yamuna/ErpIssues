import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoLoanMortagageComponent } from './sao-loan-mortagage.component';

describe('SaoLoanMortagageComponent', () => {
  let component: SaoLoanMortagageComponent;
  let fixture: ComponentFixture<SaoLoanMortagageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoLoanMortagageComponent]
    });
    fixture = TestBed.createComponent(SaoLoanMortagageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
