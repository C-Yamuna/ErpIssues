import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOccupationTypesComponent } from './add-occupation-types.component';

describe('AddOccupationTypesComponent', () => {
  let component: AddOccupationTypesComponent;
  let fixture: ComponentFixture<AddOccupationTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOccupationTypesComponent]
    });
    fixture = TestBed.createComponent(AddOccupationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
