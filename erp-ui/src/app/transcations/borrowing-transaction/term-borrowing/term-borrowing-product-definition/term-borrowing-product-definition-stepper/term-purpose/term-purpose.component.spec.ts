import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermPurposeComponent } from './term-purpose.component';

describe('TermPurposeComponent', () => {
  let component: TermPurposeComponent;
  let fixture: ComponentFixture<TermPurposeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermPurposeComponent]
    });
    fixture = TestBed.createComponent(TermPurposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
