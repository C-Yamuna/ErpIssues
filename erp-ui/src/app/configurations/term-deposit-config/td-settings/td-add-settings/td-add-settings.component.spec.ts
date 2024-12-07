import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdAddSettingsComponent } from './td-add-settings.component';

describe('TdAddSettingsComponent', () => {
  let component: TdAddSettingsComponent;
  let fixture: ComponentFixture<TdAddSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TdAddSettingsComponent]
    });
    fixture = TestBed.createComponent(TdAddSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
