import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdNonCumulativeGeneralConfigComponent } from './fd-non-cumulative-general-config.component';

describe('FdNonCumulativeGeneralConfigComponent', () => {
  let component: FdNonCumulativeGeneralConfigComponent;
  let fixture: ComponentFixture<FdNonCumulativeGeneralConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FdNonCumulativeGeneralConfigComponent]
    });
    fixture = TestBed.createComponent(FdNonCumulativeGeneralConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
