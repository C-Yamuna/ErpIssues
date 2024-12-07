import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershiAddSoilTypesComponent } from './membershi-add-soil-types.component';

describe('MembershiAddSoilTypesComponent', () => {
  let component: MembershiAddSoilTypesComponent;
  let fixture: ComponentFixture<MembershiAddSoilTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershiAddSoilTypesComponent]
    });
    fixture = TestBed.createComponent(MembershiAddSoilTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
