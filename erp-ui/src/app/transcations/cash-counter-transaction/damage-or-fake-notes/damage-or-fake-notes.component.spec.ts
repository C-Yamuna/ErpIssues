import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageOrFakeNotesComponent } from './damage-or-fake-notes.component';

describe('DamageOrFakeNotesComponent', () => {
  let component: DamageOrFakeNotesComponent;
  let fixture: ComponentFixture<DamageOrFakeNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DamageOrFakeNotesComponent]
    });
    fixture = TestBed.createComponent(DamageOrFakeNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
