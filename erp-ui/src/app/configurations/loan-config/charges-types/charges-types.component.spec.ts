import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargesTypesComponent } from './charges-types.component';

describe('ChargesTypesComponent', () => {
  let component: ChargesTypesComponent;
  let fixture: ComponentFixture<ChargesTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChargesTypesComponent]
    });
    fixture = TestBed.createComponent(ChargesTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
