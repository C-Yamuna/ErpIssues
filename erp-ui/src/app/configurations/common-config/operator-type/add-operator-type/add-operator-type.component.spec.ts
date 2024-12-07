import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOperatorTypeComponent } from './add-operator-type.component';

describe('AddOperatorTypeComponent', () => {
  let component: AddOperatorTypeComponent;
  let fixture: ComponentFixture<AddOperatorTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOperatorTypeComponent]
    });
    fixture = TestBed.createComponent(AddOperatorTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
