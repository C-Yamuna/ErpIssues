import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDccbComponent } from './add-dccb.component';

describe('AddDccbComponent', () => {
  let component: AddDccbComponent;
  let fixture: ComponentFixture<AddDccbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDccbComponent]
    });
    fixture = TestBed.createComponent(AddDccbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
