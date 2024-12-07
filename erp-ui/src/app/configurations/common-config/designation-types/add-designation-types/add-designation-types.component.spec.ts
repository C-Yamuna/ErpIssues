import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDesignationTypesComponent } from './add-designation-types.component';

describe('AddDesignationTypesComponent', () => {
  let component: AddDesignationTypesComponent;
  let fixture: ComponentFixture<AddDesignationTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDesignationTypesComponent]
    });
    fixture = TestBed.createComponent(AddDesignationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
