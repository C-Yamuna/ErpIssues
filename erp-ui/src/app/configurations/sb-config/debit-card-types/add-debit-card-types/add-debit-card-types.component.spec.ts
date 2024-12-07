import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDebitCardTypesComponent } from './add-debit-card-types.component';

describe('AddDebitCardTypesComponent', () => {
  let component: AddDebitCardTypesComponent;
  let fixture: ComponentFixture<AddDebitCardTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDebitCardTypesComponent]
    });
    fixture = TestBed.createComponent(AddDebitCardTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
