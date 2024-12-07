import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdNonCumulativeApplicationComponent } from './fd-non-cumulative-application.component';

describe('FdNonCumulativeApplicationComponent', () => {
  let component: FdNonCumulativeApplicationComponent;
  let fixture: ComponentFixture<FdNonCumulativeApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FdNonCumulativeApplicationComponent]
    });
    fixture = TestBed.createComponent(FdNonCumulativeApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
