import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationTypesComponent } from './designation-types.component';

describe('DesignationTypesComponent', () => {
  let component: DesignationTypesComponent;
  let fixture: ComponentFixture<DesignationTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesignationTypesComponent]
    });
    fixture = TestBed.createComponent(DesignationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
