import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApportionTypesComponent } from './add-apportion-types.component';

describe('AddApportionTypesComponent', () => {
  let component: AddApportionTypesComponent;
  let fixture: ComponentFixture<AddApportionTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddApportionTypesComponent]
    });
    fixture = TestBed.createComponent(AddApportionTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
