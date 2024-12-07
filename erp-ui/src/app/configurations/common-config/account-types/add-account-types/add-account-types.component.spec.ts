import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountTypesComponent } from './add-account-types.component';

describe('AddAccountTypesComponent', () => {
  let component: AddAccountTypesComponent;
  let fixture: ComponentFixture<AddAccountTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAccountTypesComponent]
    });
    fixture = TestBed.createComponent(AddAccountTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
