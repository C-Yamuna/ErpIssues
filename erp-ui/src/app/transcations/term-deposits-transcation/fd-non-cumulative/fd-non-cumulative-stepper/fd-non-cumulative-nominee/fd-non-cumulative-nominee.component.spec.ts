import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdNonCumulativeNomineeComponent } from './fd-non-cumulative-nominee.component';

describe('FdNonCumulativeNomineeComponent', () => {
  let component: FdNonCumulativeNomineeComponent;
  let fixture: ComponentFixture<FdNonCumulativeNomineeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FdNonCumulativeNomineeComponent]
    });
    fixture = TestBed.createComponent(FdNonCumulativeNomineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
