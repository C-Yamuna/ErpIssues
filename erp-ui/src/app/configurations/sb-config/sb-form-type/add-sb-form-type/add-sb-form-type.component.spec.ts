import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSbFormTypeComponent } from './add-sb-form-type.component';

describe('AddSbFormTypeComponent', () => {
  let component: AddSbFormTypeComponent;
  let fixture: ComponentFixture<AddSbFormTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSbFormTypeComponent]
    });
    fixture = TestBed.createComponent(AddSbFormTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
