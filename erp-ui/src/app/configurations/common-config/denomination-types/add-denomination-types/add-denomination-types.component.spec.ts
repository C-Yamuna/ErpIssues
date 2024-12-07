import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDenominationTypesComponent } from './add-denomination-types.component';

describe('AddDenominationTypesComponent', () => {
  let component: AddDenominationTypesComponent;
  let fixture: ComponentFixture<AddDenominationTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDenominationTypesComponent]
    });
    fixture = TestBed.createComponent(AddDenominationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
