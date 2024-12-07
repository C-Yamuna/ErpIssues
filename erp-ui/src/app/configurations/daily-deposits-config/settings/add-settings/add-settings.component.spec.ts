import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSettingsComponent } from './add-settings.component';

describe('AddSettingsComponent', () => {
  let component: AddSettingsComponent;
  let fixture: ComponentFixture<AddSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSettingsComponent]
    });
    fixture = TestBed.createComponent(AddSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
