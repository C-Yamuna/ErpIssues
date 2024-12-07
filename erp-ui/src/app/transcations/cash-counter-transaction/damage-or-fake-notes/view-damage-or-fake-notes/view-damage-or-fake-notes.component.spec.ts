import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDamageOrFakeNotesComponent } from './view-damage-or-fake-notes.component';

describe('ViewDamageOrFakeNotesComponent', () => {
  let component: ViewDamageOrFakeNotesComponent;
  let fixture: ComponentFixture<ViewDamageOrFakeNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDamageOrFakeNotesComponent]
    });
    fixture = TestBed.createComponent(ViewDamageOrFakeNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
