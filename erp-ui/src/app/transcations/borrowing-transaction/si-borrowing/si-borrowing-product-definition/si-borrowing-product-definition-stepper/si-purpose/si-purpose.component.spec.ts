import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiPurposeComponent } from './si-purpose.component';

describe('SiPurposeComponent', () => {
  let component: SiPurposeComponent;
  let fixture: ComponentFixture<SiPurposeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiPurposeComponent]
    });
    fixture = TestBed.createComponent(SiPurposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
