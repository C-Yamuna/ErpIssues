import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbFormTypeComponent } from './sb-form-type.component';

describe('SbFormTypeComponent', () => {
  let component: SbFormTypeComponent;
  let fixture: ComponentFixture<SbFormTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SbFormTypeComponent]
    });
    fixture = TestBed.createComponent(SbFormTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
