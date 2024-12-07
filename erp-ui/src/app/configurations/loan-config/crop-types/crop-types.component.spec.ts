import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropTypesComponent } from './crop-types.component';

describe('CropTypesComponent', () => {
  let component: CropTypesComponent;
  let fixture: ComponentFixture<CropTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CropTypesComponent]
    });
    fixture = TestBed.createComponent(CropTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
