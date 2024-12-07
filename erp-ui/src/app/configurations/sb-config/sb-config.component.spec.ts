import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbConfigComponent } from './sb-config.component';

describe('SbConfigComponent', () => {
  let component: SbConfigComponent;
  let fixture: ComponentFixture<SbConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SbConfigComponent]
    });
    fixture = TestBed.createComponent(SbConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
