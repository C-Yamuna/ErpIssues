import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDamageOrFakeNotesComponent } from './add-damage-or-fake-notes.component';

describe('AddDamageOrFakeNotesComponent', () => {
  let component: AddDamageOrFakeNotesComponent;
  let fixture: ComponentFixture<AddDamageOrFakeNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDamageOrFakeNotesComponent]
    });
    fixture = TestBed.createComponent(AddDamageOrFakeNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
