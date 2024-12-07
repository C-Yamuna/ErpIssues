import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubDistrictComponent } from './sub-district.component';

describe('SubDistrictComponent', () => {
  let component: SubDistrictComponent;
  let fixture: ComponentFixture<SubDistrictComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubDistrictComponent]
    });
    fixture = TestBed.createComponent(SubDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
