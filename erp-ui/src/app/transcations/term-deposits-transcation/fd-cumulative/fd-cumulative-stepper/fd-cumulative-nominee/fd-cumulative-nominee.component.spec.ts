import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdCumulativeNomineeComponent } from './fd-cumulative-nominee.component';

describe('FdCumulativeNomineeComponent', () => {
  let component: FdCumulativeNomineeComponent;
  let fixture: ComponentFixture<FdCumulativeNomineeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FdCumulativeNomineeComponent]
    });
    fixture = TestBed.createComponent(FdCumulativeNomineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
