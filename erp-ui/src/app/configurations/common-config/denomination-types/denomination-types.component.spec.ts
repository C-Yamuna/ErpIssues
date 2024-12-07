import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenominationTypesComponent } from './denomination-types.component';

describe('DenominationTypesComponent', () => {
  let component: DenominationTypesComponent;
  let fixture: ComponentFixture<DenominationTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DenominationTypesComponent]
    });
    fixture = TestBed.createComponent(DenominationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
