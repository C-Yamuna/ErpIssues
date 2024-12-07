import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdCumulativeKycComponent } from './fd-cumulative-kyc.component';

describe('FdNonCumulativeKycComponent', () => {
  let component: FdCumulativeKycComponent;
  let fixture: ComponentFixture<FdCumulativeKycComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FdCumulativeKycComponent]
    });
    fixture = TestBed.createComponent(FdCumulativeKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
