import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdNonCumulativeKycComponent } from './fd-non-cumulative-kyc.component';

describe('FdNonCumulativeKycComponent', () => {
  let component: FdNonCumulativeKycComponent;
  let fixture: ComponentFixture<FdNonCumulativeKycComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FdNonCumulativeKycComponent]
    });
    fixture = TestBed.createComponent(FdNonCumulativeKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
