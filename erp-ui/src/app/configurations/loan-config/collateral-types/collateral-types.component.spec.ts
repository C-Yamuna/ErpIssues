import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollateralTypesComponent } from './collateral-types.component';

describe('CollateralTypesComponent', () => {
  let component: CollateralTypesComponent;
  let fixture: ComponentFixture<CollateralTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollateralTypesComponent]
    });
    fixture = TestBed.createComponent(CollateralTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
