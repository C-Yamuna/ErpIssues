import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbSettingsComponent } from './sb-settings.component';

describe('SbSettingsComponent', () => {
  let component: SbSettingsComponent;
  let fixture: ComponentFixture<SbSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SbSettingsComponent]
    });
    fixture = TestBed.createComponent(SbSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
