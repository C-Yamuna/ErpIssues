import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollateralTypesComponent } from './add-collateral-types.component';

describe('AddCollateralTypesComponent', () => {
  let component: AddCollateralTypesComponent;
  let fixture: ComponentFixture<AddCollateralTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCollateralTypesComponent]
    });
    fixture = TestBed.createComponent(AddCollateralTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
