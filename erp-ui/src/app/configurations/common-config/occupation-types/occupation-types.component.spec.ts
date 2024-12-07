import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupationTypesComponent } from './occupation-types.component';

describe('OccupationTypesComponent', () => {
  let component: OccupationTypesComponent;
  let fixture: ComponentFixture<OccupationTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OccupationTypesComponent]
    });
    fixture = TestBed.createComponent(OccupationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
