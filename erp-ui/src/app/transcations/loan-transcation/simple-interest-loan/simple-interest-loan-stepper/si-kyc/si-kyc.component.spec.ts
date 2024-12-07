import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiKycComponent } from './si-kyc.component';

describe('SiKycComponent', () => {
  let component: SiKycComponent;
  let fixture: ComponentFixture<SiKycComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiKycComponent]
    });
    fixture = TestBed.createComponent(SiKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
