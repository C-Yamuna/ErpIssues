import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermDepositTypesComponent } from './term-deposit-types.component';

describe('TermDepositTypesComponent', () => {
  let component: TermDepositTypesComponent;
  let fixture: ComponentFixture<TermDepositTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermDepositTypesComponent]
    });
    fixture = TestBed.createComponent(TermDepositTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
