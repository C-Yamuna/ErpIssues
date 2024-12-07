import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerTypesComponent } from './farmer-types.component';

describe('FarmerTypesComponent', () => {
  let component: FarmerTypesComponent;
  let fixture: ComponentFixture<FarmerTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FarmerTypesComponent]
    });
    fixture = TestBed.createComponent(FarmerTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
