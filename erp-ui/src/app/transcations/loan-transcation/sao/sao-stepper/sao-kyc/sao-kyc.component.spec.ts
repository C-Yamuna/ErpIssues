import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaoKycComponent } from './sao-kyc.component';

describe('SaoKycComponent', () => {
  let component: SaoKycComponent;
  let fixture: ComponentFixture<SaoKycComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaoKycComponent]
    });
    fixture = TestBed.createComponent(SaoKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
