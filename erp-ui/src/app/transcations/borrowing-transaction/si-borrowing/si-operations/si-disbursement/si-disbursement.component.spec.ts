import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiDisbursementComponent } from './si-disbursement.component';

describe('SiDisbursementComponent', () => {
  let component: SiDisbursementComponent;
  let fixture: ComponentFixture<SiDisbursementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiDisbursementComponent]
    });
    fixture = TestBed.createComponent(SiDisbursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
