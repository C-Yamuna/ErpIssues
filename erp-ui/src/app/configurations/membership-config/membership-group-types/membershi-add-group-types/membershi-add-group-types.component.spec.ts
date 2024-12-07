import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershiAddGroupTypesComponent } from './membershi-add-group-types.component';

describe('MembershiAddGroupTypesComponent', () => {
  let component: MembershiAddGroupTypesComponent;
  let fixture: ComponentFixture<MembershiAddGroupTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershiAddGroupTypesComponent]
    });
    fixture = TestBed.createComponent(MembershiAddGroupTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
