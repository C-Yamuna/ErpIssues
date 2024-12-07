import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCasteComponent } from './add-caste.component';

describe('AddCasteComponent', () => {
  let component: AddCasteComponent;
  let fixture: ComponentFixture<AddCasteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCasteComponent]
    });
    fixture = TestBed.createComponent(AddCasteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
