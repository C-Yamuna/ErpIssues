import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFarmerTypesComponent } from './add-farmer-types.component';

describe('AddFarmerTypesComponent', () => {
  let component: AddFarmerTypesComponent;
  let fixture: ComponentFixture<AddFarmerTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFarmerTypesComponent]
    });
    fixture = TestBed.createComponent(AddFarmerTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
