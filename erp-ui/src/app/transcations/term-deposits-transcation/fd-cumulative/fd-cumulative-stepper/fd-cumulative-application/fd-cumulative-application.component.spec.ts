import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdCumulativeApplicationComponent } from './fd-cumulative-application.component';

describe('FdNonCumulativeApplicationComponent', () => {
  let component: FdCumulativeApplicationComponent;
  let fixture: ComponentFixture<FdCumulativeApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FdCumulativeApplicationComponent]
    });
    fixture = TestBed.createComponent(FdCumulativeApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
