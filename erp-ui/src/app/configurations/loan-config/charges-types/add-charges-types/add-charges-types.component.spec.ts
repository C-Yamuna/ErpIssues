import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChargesTypesComponent } from './add-charges-types.component';

describe('AddChargesTypesComponent', () => {
  let component: AddChargesTypesComponent;
  let fixture: ComponentFixture<AddChargesTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddChargesTypesComponent]
    });
    fixture = TestBed.createComponent(AddChargesTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
