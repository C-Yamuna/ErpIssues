import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermDepositConfigComponent } from './term-deposit-config.component';

describe('TermDepositConfigComponent', () => {
  let component: TermDepositConfigComponent;
  let fixture: ComponentFixture<TermDepositConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermDepositConfigComponent]
    });
    fixture = TestBed.createComponent(TermDepositConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
