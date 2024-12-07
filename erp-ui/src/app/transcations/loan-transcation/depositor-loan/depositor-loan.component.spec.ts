import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositorLoanComponent } from './depositor-loan.component';

describe('DepositorLoanComponent', () => {
  let component: DepositorLoanComponent;
  let fixture: ComponentFixture<DepositorLoanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepositorLoanComponent]
    });
    fixture = TestBed.createComponent(DepositorLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
