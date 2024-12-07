import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRelationshiTypeComponent } from './add-relationshi-type.component';

describe('AddRelationshiTypeComponent', () => {
  let component: AddRelationshiTypeComponent;
  let fixture: ComponentFixture<AddRelationshiTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRelationshiTypeComponent]
    });
    fixture = TestBed.createComponent(AddRelationshiTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
