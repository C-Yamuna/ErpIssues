import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiPurposeComponent } from './ci-purpose.component';

describe('CiPurposeComponent', () => {
  let component: CiPurposeComponent;
  let fixture: ComponentFixture<CiPurposeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CiPurposeComponent]
    });
    fixture = TestBed.createComponent(CiPurposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
