import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanConfigComponent } from './loan-config.component';

describe('LoanConfigComponent', () => {
  let component: LoanConfigComponent;
  let fixture: ComponentFixture<LoanConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanConfigComponent]
    });
    fixture = TestBed.createComponent(LoanConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
