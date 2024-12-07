import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCropTypesComponent } from './add-crop-types.component';

describe('AddCropTypesComponent', () => {
  let component: AddCropTypesComponent;
  let fixture: ComponentFixture<AddCropTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCropTypesComponent]
    });
    fixture = TestBed.createComponent(AddCropTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
