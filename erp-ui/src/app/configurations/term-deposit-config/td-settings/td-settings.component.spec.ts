import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdSettingsComponent } from './td-settings.component';

describe('TdSettingsComponent', () => {
  let component: TdSettingsComponent;
  let fixture: ComponentFixture<TdSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TdSettingsComponent]
    });
    fixture = TestBed.createComponent(TdSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
