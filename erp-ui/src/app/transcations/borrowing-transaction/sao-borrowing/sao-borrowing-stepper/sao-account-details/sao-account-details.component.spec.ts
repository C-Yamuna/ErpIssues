import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoAccountDetailsComponent } from './sao-account-details.component';

describe('SaoAccountDetailsComponent', () => {
  let component: SaoAccountDetailsComponent;
  let fixture: ComponentFixture<SaoAccountDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoAccountDetailsComponent]
    });
    fixture = TestBed.createComponent(SaoAccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
