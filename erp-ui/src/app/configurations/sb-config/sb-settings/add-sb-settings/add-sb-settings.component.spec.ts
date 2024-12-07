import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSbSettingsComponent } from './add-sb-settings.component';

describe('AddSbSettingsComponent', () => {
  let component: AddSbSettingsComponent;
  let fixture: ComponentFixture<AddSbSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSbSettingsComponent]
    });
    fixture = TestBed.createComponent(AddSbSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
