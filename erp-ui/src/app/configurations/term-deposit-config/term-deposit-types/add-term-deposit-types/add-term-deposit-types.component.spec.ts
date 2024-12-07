import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTermDepositTypesComponent } from './add-term-deposit-types.component';

describe('AddTermDepositTypesComponent', () => {
  let component: AddTermDepositTypesComponent;
  let fixture: ComponentFixture<AddTermDepositTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTermDepositTypesComponent]
    });
    fixture = TestBed.createComponent(AddTermDepositTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
